import { Button } from "@mui/material";
import Common from "@zydon/common/components/Common";
import Modal from "@zydon/common/components/Modal";
import useToggle from "@zydon/common/hooks/useToggle";

const App = (_: any) => {
  const [open, toggleOpen] = useToggle();

  return (
    <Common primaryColor="#00ad57">
      <Button onClick={toggleOpen}>Exibir PDF</Button>

      <Modal open={open} onClose={toggleOpen} fullScreen dialogTitle="PDF">
        <object
          data="https://pdfobject.com/pdf/sample.pdf"
          type="application/pdf"
          width="100%"
          height="1000px"
        >
          <p>
            Alternative text - include a link{" "}
            <a href="https://pdfobject.com/pdf/sample.pdf">to the PDF!</a>
          </p>
        </object>
      </Modal>
    </Common>
  );
};

export default App;
