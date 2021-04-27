import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../services/customHooks/useAuth";
import { Row, Button } from "antd";
import { getUserFavorites, removeFavorite } from "../../services/favoritesApi";
import {
  ListContainer,
  StarIcon,
  CustomSwitch,
  StyledPagination,
  StyledSelect,
  PageFooter,
  CustomInput,
  CustomButton,
} from "./styles";
import { useQuery } from "../../services/customHooks/useQuery";

const { Option } = StyledSelect;

function Favorites(props) {
  const query = useQuery();
  const context = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [page, setPage] = useState(
    query.get("page") !== "null" ? query.get("page") : 1
  );
  const [sortBy, setSortBy] = useState(query.get("sortBy"));
  const [filters, setFilters] = useState([]);

  async function getFavorites(getService) {
    const { data, attributes } = await getUserFavorites(context.signed);

    setItems(data);
    setFilteredItems(data);
    setAttributes(attributes);

    const lastPage = Math.ceil(data.length / 10);

    console.log(page);
    if (page > lastPage) {
      setPage(lastPage);
    } else if (page < 1 || !query.get("page")) {
      console.log("oporra");
      setPage(1);
    }

    let filters = [];
    await attributes.map((attribute) => {
      if (query.get(attribute)) {
        filters.push({
          key: attribute,
          value: query.get(attribute),
          active: true,
        });
      } else {
        filters.push({ key: attribute, value: "", active: false });
      }
    });

    setFilters(filters);

    handleSort(sortBy, filteredItems);
  }

  async function handleSort(value, allItems) {
    const dataArray = [...allItems];

    setFilteredItems(
      dataArray.sort((itemA, itemB) => {
        if (itemA[value] < itemB[value]) return -1;
        if (itemA[value] > itemB[value]) return 1;
        if (!itemB[value]) return -1;
        return 0;
      })
    );

    setSortBy(value);
    query.set("sortBy", value);
    props.history.push(window.location.pathname + "?" + query.toString());
  }

  async function handleFiltersChange(filter, checked) {
    let arr = [...filters];
    let filterIndex = arr.indexOf(filter);

    arr[filterIndex].active = checked;

    if (!checked) {
      arr[filterIndex].value = "";
      query.set(arr[filterIndex].key, "");
      props.history.push(window.location.pathname + "?" + query.toString());
    }

    setFilters(arr);
  }

  async function handleSearch(filters, allItems) {
    let itemsArr = [...allItems];
    let filtersArr = [...filters];

    filtersArr.forEach((filter) => {
      if (filter.active) {
        itemsArr = itemsArr.filter((item) => {
          if (item[filter.key])
            return item[filter.key]
              .toLowerCase()
              .includes(filter.value.toLowerCase());
        });
        query.set(filter.key, filter.value);
      }
    });
    handleSort(sortBy, itemsArr);

    props.history.push(window.location.pathname + "?" + query.toString());
    // await filters.map((item) => {
    // });
    // setFilteredItems(itemsArr);
  }

  async function handleFiltersValueChange(value, filter) {
    let arr = [...filters];

    arr[arr.indexOf(filter)].value = value;

    setFilters(arr);
  }

  async function handleDislike(item, user, allItems) {
    let arr = [...allItems];
    let itemIndex = await user.favorites.findIndex((element) => {
      return JSON.stringify(item) === JSON.stringify(element);
    });

    await removeFavorite(itemIndex, user);

    arr.splice(itemIndex, 1);
    setItems(arr);
  }

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    setPaginatedItems(filteredItems.slice((page - 1) * 10, page * 10));

    query.set("page", page);
    props.history.push(window.location.pathname + "?" + query.toString());
  }, [page, filteredItems]);

  useEffect(() => {
    handleSearch(filters, items);

    query.set("page", page);
    props.history.push(window.location.pathname + "?" + query.toString());
  }, [filters, items]);

  return (
    <ListContainer>
      <h1>Favorites List</h1>
      <h2>List of favorites characters</h2>
      {filters.map((filter) => (
        <CustomSwitch
          checked={filter.active}
          onChange={(checked) => handleFiltersChange(filter, checked)}
          checkedChildren={filter.key}
          unCheckedChildren={filter.key}
        />
      ))}
      {filters.map((filter, idx) =>
        filter.active ? (
          <Row>
            <CustomInput
              placeholder={filter.key}
              value={filter.value}
              onChange={(e) => handleFiltersValueChange(e.target.value, filter)}
            />
          </Row>
        ) : null
      )}
      <Row type="flex" justify="center" align="middle">
        {paginatedItems.map((item, idx) => (
          <Card
            id={idx}
            src={item[item.imageAttribute]}
            alt={"character-image"}
            key={idx}
          >
            {attributes.map((attribute) =>
              item[attribute] ? (
                <p>
                  <b>{attribute}:</b> {item[attribute]}
                </p>
              ) : null
            )}
            <CustomButton
              type="danger"
              onClick={() => handleDislike(item, context.signed, items)}
              icon={<StarIcon />}
            >
              Dislike
            </CustomButton>
          </Card>
        ))}
      </Row>
      <PageFooter col={5}>
        <p>Sort by:</p>
        <StyledSelect
          placeholder="select an attribute"
          value={sortBy}
          onChange={(value) => {
            handleSort(value, filteredItems);
          }}
          defaultValue={attributes[0]}
        >
          {attributes.map((attribute, idx) => (
            <Option value={attribute} key={idx}>
              {attribute}
            </Option>
          ))}
        </StyledSelect>
        <StyledPagination
          onChange={(page) => setPage(page)}
          pageSize={10}
          showSizeChanger={false}
          current={parseInt(page)}
          total={filteredItems.length}
        />
      </PageFooter>
    </ListContainer>
  );
}

export default Favorites;
