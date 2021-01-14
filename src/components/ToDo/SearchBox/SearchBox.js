import React, { useState } from "react";
import styles from "./SearchBox.module.scss";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { requestMiddleWare } from "../../../redux/actions";
import { jsDateformatter } from "../../../helpers/utils";

const statusOptions = [
  { label: "Reset", value: "" },
  { label: "Active", value: "active" },
  { label: "Done", value: "done" },
];

const sortOptions = [
  { label: "Reset", value: "" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
  { label: "Creation date oldest", value: "creation_date_oldest" },
  { label: "Creation date newest", value: "creation_date_newest" },
  { label: "Completion date oldest", value: "completion_date_oldest" },
  { label: "Completion date newest", value: "completion_date_newest" },
];

const dateOptions = [
  { label: "Create later than", value: "create_lte" },
  { label: "Create earlier than", value: "create_gte" },
  { label: "Complete later than", value: "complete_lte" },
  { label: "Complete earlier than", value: "complete_gte" },
];

const SearchBox = (props) => {
  const [status, setStatus] = useState({
    label: "",
    value: "",
  });

  const [sort, setSort] = useState({
    label: "",
    value: "",
  });

  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });

  const [search, setSearch] = useState("");

  const handleChange = (event) => setSearch(event.target.value);
  const handleOnKeyDown = (event) => {
    if (search && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      setSearch("");
    }
  };

  const handleSubmit = () => {
    const data = {};
    const { create_lte, create_gte, complete_lte, complete_gte } = dates;

    if (create_lte) data.create_lte = jsDateformatter(create_lte);
    if (create_gte) data.create_gte = jsDateformatter(create_lte);
    if (complete_lte) data.complete_lte = jsDateformatter(create_lte);
    if (complete_gte) data.complete_gte = jsDateformatter(create_lte);
    if (status) data.status = status.value;
    if (sort) data.sort = sort.value;
    if (search) data.search = search;

    props.requestMiddleWare(data);
  };

  return (
    <>
      <div className={styles.searchBoxContainer}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand className={styles.searchBoxNavDropdown}>
            Search/Sort/Filter
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title={status.value ? status.label : "Status"}
                className={styles.searchBoxNavDropdown}
              >
                {statusOptions.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => setStatus(item)}
                    active={status.value === item.value}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown
                title={sort.value ? sort.label : "Sort"}
                className="mr-5"
              >
                {sortOptions.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => setSort(item)}
                    active={sort.value === item.value}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Form inline>
              <input
                type="search"
                placeholder="Search..."
                className="mr-3 mt-2"
                value={search}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
              />

              <Button
                variant="outline-success"
                onClick={handleSubmit}
                className="mt-2"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.dateOptions}>
          {dateOptions.map((item, index) => (
            <div key={index} className={styles.dateOptionsItems}>
              <span className="mx-1">{item.label}</span>
              <DatePicker
                selected={dates[item.value]}
                onChange={(date) => {
                  setDates({
                    ...dates,
                    [item.value]: date,
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  requestMiddleWare,
};

export default connect(null, mapDispatchToProps)(SearchBox);
