import PropTypes from "prop-types";
import DialogModal from "../../../DialogModal";
import { useState } from "react";

export default function ModalDeleteCustomer(props) {
  const { item, HandleModal, handleDelete } = props;
  const [loading, setLoading] = useState(false);
  const handleDeleteCustomer = async () => {
    setLoading(true);
    try {
      await handleDelete(item.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <DialogModal id={`modal-confirm-hapus-pelanggan`}>
      <div className="bg-inherit">
        <h3 className="text-xl font-semibold text-center mb-5 text-gray-700">
          Hapus Data
        </h3>
        <p className="mb-10 text-center">
          Apakah anda yakin ingin menghapus data {item.nama}?
        </p>
        <div className="flex justify-evenly">
          <button
            className="btn btn-primary text-white"
            onClick={() => HandleModal.close(`modal-confirm-hapus-pelanggan`)}
          >
            Batal
          </button>
          <button
            className="btn btn-error text-white"
            onClick={handleDeleteCustomer}
          >
            {loading ? (
              <span className="loading loading-bars lg:loading-md loading-sm"></span>
            ) : (
              "Hapus"
            )}
          </button>
        </div>
      </div>
    </DialogModal>
  );
}

ModalDeleteCustomer.propTypes = {
  item: PropTypes.object,
  HandleModal: PropTypes.func,
  handleDelete: PropTypes.func,
};
