import React from "react";
import styles from "./SearchBox.module.scss";
import { Form, Button } from "react-bootstrap";

const SearchBox = (props) => {
  return (
    <div className={styles.searchBoxContainer}>
      <Form inline>
        <input
          type="search"
          placeholder="Search..."
          className="mr-3 mt-2"
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        />

        <Button
          variant="outline-success"
          onClick={props.onSubmit}
          className={`${styles.searchButton} mt-2`}
        >
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
