import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Card from "react-bootstrap/Card";

const CreateCategory = () => {
  const [isCreateCategoryFormVisible, setIsCreateCategoryFormVisible] =
    useState(false);

  const showCreateCategoryForm = () => {
    setIsCreateCategoryFormVisible(true);
  };

  const hideCreateCategoryForm = () => {
    setIsCreateCategoryFormVisible(false);
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
          <Form>
            <Form.Group controlId="categoryName" className="mb-2">
              <Form.Control type="text" placeholder="Enter category name" />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                onClick={hideCreateCategoryForm}
              >
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
