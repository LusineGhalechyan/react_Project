import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./About.module.scss";

const ToDoListDescription = `ToDo List,  

What does it mean?

This is a list of things to do, tasks, plans for a day or another period of time. Most often, usually a piece of paper and a pen are using to maintain a list of tasks:
more advanced ones use special software, apps which my ToDo list can provide..

Just enter your plans for the day at the top  via button  \` Add new task \` , mark the completed tasks with the checkbox in case You want to remove them and remove
via  \` Remove selected \` button. You are able to edit new lists, while the old list will be updated or cleared as you prefer or remove each task separately. 

And most importantly, you can use it both on PCs, tablets and on mobile phones, IOS, android and others. 

CONTACT ME
You are able GET IN TOUCH with me if there will be any question for support, encouragement or If you have any comment.

Each response is important to me.

Near you,

Lucy Ghalechyan

`;

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
