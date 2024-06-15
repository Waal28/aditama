import PropTypes from "prop-types";

export default function DialogModal(props) {
  const { id, children } = props;
  return (
    <main>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box bg-white">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </main>
  );
}

DialogModal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};
