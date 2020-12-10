import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./About.module.scss";
import { ToDoListDescription } from "../../../../helpers/descriptionAbout";


const About = () => {
  return (
    <Card border="primary" className={styles.about}>
      <Card.Header as="h5">TODO LIST</Card.Header>
      <Card.Body>
        <Card.Title>Task List Organizer</Card.Title>
        <Card.Text className={styles.lineBreak}>
          {ToDoListDescription}
        </Card.Text>
        <Button variant="link" className={styles.aboutCardButton}>
          <Link to="/contact" className={styles.aboutCardLink}>
            GET IN TOUCH &gt;&gt;
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default About;
