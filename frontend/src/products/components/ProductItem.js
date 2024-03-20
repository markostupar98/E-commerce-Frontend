import React, { useState, useContext } from "react";
import "./ProductItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useFetchHook } from "../../shared/components/hooks/fetchHook";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/components/context/AuthContext";

const ProductItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useFetchHook();
  const auth = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openDetails = () => setShowDetails(true);
  const closeDetails = () => setShowDetails(false);

  const showDeleteWarning = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarning = () => {
    setShowConfirmModal(false);
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showDetails}
        onCancel={closeDetails}
        header={props.address && props.title && props.description}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeDetails}>Close</Button>}
      >
        <div className="map-container">
          <h2>Product detail</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarning}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarning}>
              Cancel
            </Button>
            <Button danger onClick={confirmDelete}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed ?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openDetails} inverse>
              View on map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/products/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarning}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
export default ProductItem;
