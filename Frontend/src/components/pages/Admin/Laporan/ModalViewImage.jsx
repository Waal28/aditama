import PropTypes from "prop-types";
import DialogModal from "../../../DialogModal";

export default function ModalViewImage({ path }) {
  const { VITE_BASE_URL_API } = import.meta.env;
  return (
    <DialogModal id={`modal-view-image`}>
      <div className="bg-gray-300 mx-auto flex justify-center items-center">
        <img
          src={`${VITE_BASE_URL_API}${path}`}
          className="w-full h-full"
          alt="..."
        />
      </div>
    </DialogModal>
  );
}
ModalViewImage.propTypes = {
  path: PropTypes.string,
};
