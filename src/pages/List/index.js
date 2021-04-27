import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { Row, Typography } from "antd";
import { useAuth } from "../../services/customHooks/useAuth";
import { getGoTCharacters } from "../../services/thronesApi";
import { getBrBaCharacters } from "../../services/breakingBadApi";
import { addFavorite } from "../../services/favoritesApi";
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

const { Paragraph } = Typography;
const { Option } = StyledSelect;

function List(props) {
  const context = useAuth();
  const query = useQuery();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [imageKey, setImageKey] = useState([]);
  const [page, setPage] = useState(
    query.get("page") !== "null" ? query.get("page") : 1
  );
  const [sortBy, setSortBy] = useState(query.get("sortBy"));
  const [filters, setFilters] = useState([]);

  async function getChars(getService) {
    const { data, attributes, imageKey } = await getService();

    if (context.signed) {
      await data.map(async (element) => {
        element.imageAttribute = await imageKey;
        element.liked = await isInFavorites(element, context.signed);
        delete element.imageAttribute;
      });
    }

    setItems(data);
    setFilteredItems(data);
    setAttributes(attributes);
    setImageKey(imageKey);

    const lastPage = Math.floor(data.length / 10);

    if (page > lastPage) {
      setPage(lastPage);
    } else if (page < 1) {
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

  async function isInFavorites(item, user) {
    return user.favorites.some((element) => {
      return JSON.stringify(element) === JSON.stringify(item);
    });
  }

  async function handleAddFavorite(
    allItems,
    item,
    loggedUser,
    imageAttribute,
    attr
  ) {
    let arr = [...allItems];

    const index = arr.findIndex(
      (x) => JSON.stringify(x) === JSON.stringify(item)
    );

    arr[index].liked = true;

    setItems(arr);

    await addFavorite(
      JSON.parse(JSON.stringify(item)),
      loggedUser,
      imageAttribute,
      attr
    );
  }

  useEffect(() => {
    switch (props.match.params.show) {
      case "got":
        getChars(getGoTCharacters);
        break;
      case "bb":
        getChars(getBrBaCharacters);
        break;
      default:
        break;
    }
  }, [props.match.params.show]);

  useEffect(() => {
    setPaginatedItems(filteredItems.slice((page - 1) * 10, page * 10));

    query.set("page", page);
    props.history.push(window.location.pathname + "?" + query.toString());
  }, [page, filteredItems]);

  useEffect(() => {
    handleSearch(filters, items);
    // handleSort(sortBy, filteredItems);

    query.set("page", page);
    props.history.push(window.location.pathname + "?" + query.toString());
  }, [filters]);

  return (
    <ListContainer>
      <h1>Lista</h1>
      <h2>Lista de personagens</h2>
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
          <Card src={item[imageKey]} alt={"character-image"} id={idx} key={idx}>
            <Paragraph expandable>
              {attributes.map((attribute) => (
                <p>
                  <b>{attribute}:</b> {item[attribute]}
                </p>
              ))}
            </Paragraph>
            {context.signed && !item.liked ? (
              <CustomButton
                type={item.liked ? "danger" : "primary"}
                icon={<StarIcon />}
                onClick={() =>
                  handleAddFavorite(
                    items,
                    item,
                    context.signed,
                    imageKey,
                    attributes
                  )
                }
              >
                Like
              </CustomButton>
            ) : null}
          </Card>
        ))}
      </Row>
      <PageFooter>
        <p>Sort by:</p>
        <StyledSelect
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

export default List;
