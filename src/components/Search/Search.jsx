import { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./search.module.css";
import {
  Form,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import propTypes from "prop-types";
import { submitSearchThunk, getTasksThunk } from "../../Redux/actions";
import types from "../../Redux/actionTypes";

const searchCls = ["w-100", styles.search];
const wrapperCls = ["d-flex flex-column align-items-center", styles.wrapper];
const dateFilterCls = ["d-flex flex-column", styles.dateFilter];

const sortVariants = [
  {
    name: "A-Z",
    value: "a-z",
  },
  {
    name: "Z-A",
    value: "z-a",
  },
  {
    name: "First older created",
    value: "creation_date_oldest",
  },
  {
    name: "First newer created",
    value: "creation_date_newest",
  },
  {
    name: "First older completed",
    value: "completion_date_oldest",
  },
  {
    name: "First newer completed",
    value: "completion_date_newest",
  },
  {
    name: "Clear",
    value: "",
  },
];

const statusVariants = [
  {
    name: "Active",
    value: "active",
  },
  {
    name: "Done",
    value: "done",
  },
  {
    name: "All",
    value: "",
  },
];

export const Search = ({
  SearchState,
  SearchState: {
    status,
    search,
    create_lte,
    create_gte,
    complete_lte,
    complete_gte,
    sort,
  },
  handleChangeSearch,
  handleChangeDropdownValue,
  handleChangeFilterDate,
  handleSubmit,
  handleClearFilters,
  resetData,
}) => {
  useEffect(() => () => resetData(), [resetData]);

  const sortDropdownJSX = sortVariants.map((variant, index) => {
    return (
      <Dropdown.Item
        className={styles.item}
        key={index}
        onClick={() => handleChangeDropdownValue("sort", variant.value)}
      >
        {variant.name}
      </Dropdown.Item>
    );
  });

  const statusDropdownJSX = statusVariants.map((variant, index) => {
    return (
      <Dropdown.Item
        className={styles.item}
        key={index}
        onClick={() => handleChangeDropdownValue("status", variant.value)}
      >
        {variant.name}
      </Dropdown.Item>
    );
  });

  return (
    <Form className="d-flex flex-column align-items-center">
      <Form.Group className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
          onKeyPress={({ type, key }) => handleSubmit(type, key, SearchState)}
          className={searchCls.join(" ")}
        />
        <Button
          variant="info"
          className={styles.searchButton}
          onClick={({ type, key }) => handleSubmit(type, key, SearchState)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              fontSize: "20px",
            }}
          />
        </Button>
      </Form.Group>
      <Form.Group className={wrapperCls.join(" ")}>
        <Form.Group className="d-flex">
          <DropdownButton
            variant="light"
            className="mr-1"
            title={
              sort ? (
                sortVariants.find((variant) => variant.value === sort).name
              ) : (
                <FontAwesomeIcon
                  icon={faSort}
                  style={{
                    fontSize: "15px",
                    color: "rgb(5, 112, 112)",
                  }}
                />
              )
            }
          >
            {sortDropdownJSX}
          </DropdownButton>

          <DropdownButton
            variant="light"
            className="mr-1"
            title={
              status ? (
                statusVariants.find((variant) => variant.value === status).name
              ) : (
                <FontAwesomeIcon
                  icon={faFilter}
                  style={{
                    fontSize: "15px",
                    color: "rgb(5, 112, 112)",
                  }}
                />
              )
            }
          >
            {statusDropdownJSX}
          </DropdownButton>

          <Button variant="light" onClick={handleClearFilters}>
            Clear
          </Button>
        </Form.Group>

        <Form.Group className={dateFilterCls.join(" ")}>
          <Form.Group>
            <Form.Label className={styles.label} htmlFor="create_lte">
              Created before
            </Form.Label>
            <DatePicker
              id="create_lte"
              placeholderText="MM/DD/YY"
              selected={create_lte}
              onChange={(date) => handleChangeFilterDate("create_lte", date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label} htmlFor="create_gte">
              Created after
            </Form.Label>
            <DatePicker
              id="create_gte"
              placeholderText="MM/DD/YY"
              selected={create_gte}
              onChange={(date) => handleChangeFilterDate("create_gte", date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label} htmlFor="complete_lte">
              Completed before
            </Form.Label>
            <DatePicker
              id="complete_lte"
              placeholderText="MM/DD/YY"
              selected={complete_lte}
              onChange={(date) => handleChangeFilterDate("complete_lte", date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label} htmlFor="complete_gte">
              Completed after
            </Form.Label>

            <DatePicker
              id="complete_gte"
              placeholderText="MM/DD/YY"
              selected={complete_gte}
              onChange={(date) => handleChangeFilterDate("complete_gte", date)}
            />
          </Form.Group>
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

Search.propTypes = {
  SearchState: propTypes.shape({
    status: propTypes.string,
    search: propTypes.string,
    create_lte: propTypes.instanceOf(Date),
    create_gte: propTypes.instanceOf(Date),
    complete_lte: propTypes.instanceOf(Date),
    complete_gte: propTypes.instanceOf(Date),
    sort: propTypes.string,
  }),
  handleChangeSearch: propTypes.func.isRequired,
  handleChangeDropdownValue: propTypes.func.isRequired,
  handleChangeFilterDate: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleClearFilters: propTypes.func.isRequired,
  resetData: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { SearchState } = state;

  return {
    SearchState,
  };
};

const mapDispatchToProps = (dispatch) => {
  const handleChangeSearch = (value) => {
    dispatch({ type: types.CHANGE_SEARCH, value });
  };
  const handleChangeDropdownValue = (dropdown, value) => {
    dispatch({ type: types.CHANGE_DROPDOWN_VALUE, dropdown, value });
  };
  const handleChangeFilterDate = (name, date) => {
    dispatch({ type: types.CHANGE_FILTER_DATE, name, date });
  };
  const handleSubmit = (type, key, filterData) => {
    dispatch(() => {
      submitSearchThunk(dispatch, type, key, filterData);
    });
  };
  const handleClearFilters = () => {
    dispatch(getTasksThunk);
    dispatch({ type: types.RESET_SEARCH_DATA });
  };
  const resetData = () => {
    dispatch({ type: types.RESET_SEARCH_DATA });
  };

  return {
    handleChangeSearch,
    handleChangeDropdownValue,
    handleChangeFilterDate,
    handleSubmit,
    handleClearFilters,
    resetData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
