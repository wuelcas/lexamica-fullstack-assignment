import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useAtom } from "jotai";
import { createCategoryAtom } from "../stores/atoms";

const CreateCategory = ({ position }) => {
  const [, createCategory] = useAtom(createCategoryAtom);
  const [isCreateCategoryFormVisible, setIsCreateCategoryFormVisible] =
    useState(false);

  const showCreateCategoryForm = () => {
    setIsCreateCategoryFormVisible(true);
  };

  const hideCreateCategoryForm = () => {
    document.getElementById("categoryName").value = "";
    setIsCreateCategoryFormVisible(false);
  };

  const createNewCategory = (event) => {
    event.preventDefault();
    createCategory({
      name: event.target.categoryName.value,
      position,
    });
    hideCreateCategoryForm();
  };

  return (
    <Card>
      <Card.Body>
        {!isCreateCategoryFormVisible && (
          <Button variant="outline-primary" onClick={showCreateCategoryForm}>
            Create a Category
          </Button>
        )}
        {isCreateCategoryFormVisible && (
          <Form onSubmit={createNewCategory}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Enter category name"
                id="categoryName"
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Create
              </Button>
              <Button variant="secondary" onClick={hideCreateCategoryForm}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default CreateCategory;
