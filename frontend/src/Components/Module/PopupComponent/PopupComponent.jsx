import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupComponent = ({ open, setOpen, message }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="flex justify-center text-center">{message}</span>
          <div className=" pl-[30%] pt-5">
            <button
              className="border-2 border-blue-500 h-9 w-16 bg-blue-500 rounded-md font-semibold text-[15px] "
              onClick={() => setOpen(false)}
            >
              Ok
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupComponent;
