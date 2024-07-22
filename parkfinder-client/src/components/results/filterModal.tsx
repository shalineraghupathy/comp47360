import React from "react";
import { Modal, Button } from "react-bootstrap";
import ResultFilters from "./ResultFilters";
import { Filters } from "../parksearch/ParkSearchForm";

interface FilterModalProps {
  show: boolean;
  handleClose: () => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  handleClose,
  handleApplyFilters,
  handleResetFilters,
  filters,
  setFilters,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResultFilters
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          filters={filters}
          setFilters={setFilters}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleResetFilters}>
          Reset Filters
        </Button>
        <Button variant="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
