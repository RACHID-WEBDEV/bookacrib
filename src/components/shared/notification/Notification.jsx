/* eslint-disable react/prop-types */
import { useState } from "react";
import Popup from "./Popup";
// import { Button } from "./Form/Button";

import SuccessImage from "src/assets/notify-image/password-reset.svg";
import WarningImage from "src/assets/notify-image/warning-illust.svg";
import ErrorImage from "src/assets/notify-image/error-illust.svg";
import InfoImage from "src/assets/notify-image/info-illust.svg";
import { Button } from "../../forms/Button";

// interface NotificationProps {
//   message: any;
//   type: "info" | "success" | "warning" | "error";
//   onCancel?: any;
//   onApprove?: any;
//   style?: string;
//   maxWidth?: string;
//   children?: any;
// }

const Notification = ({
  message,
  type,
  onCancel,
  onApprove,
  maxWidth,
  style,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  // const [isApproved, setIsApproved] = useState(false);

  const handleCloseNotification = () => {
    onCancel();
    setIsOpen(false);
  };

  const handleClickCancel = () => {
    onCancel();
    handleCloseNotification();
  };

  const handleClickApprove = () => {
    onApprove();
    handleCloseNotification();
  };

  return (
    <>
      {isOpen && (
        <Popup
          popUpClose={handleCloseNotification}
          maxWidth={maxWidth}
          style={style}
        >
          <div className="flex flex-col items-center justify-center w-full  p-16">
            {type === "success" && (
              <Success message={message} title="Success" image={SuccessImage} />
            )}
            {type === "info" && (
              <Info message={message} title="Info" image={InfoImage} />
            )}
            {type === "warning" && (
              <Warning message={message} title="Warning" image={WarningImage} />
            )}
            {type === "error" && (
              <Error message={message} title="Error" image={ErrorImage} />
            )}
            {children}
            <div className="max-w-xl">
              <div className="flex items-center justify-center mt-4 w-full gap-2">
                {onApprove && (
                  <Button
                    color="success"
                    className="w-32 justify-center"
                    onClick={handleClickApprove}
                    // type="submit"
                  >
                    Yes, I&apos;m Sure
                  </Button>
                )}{" "}
                {onCancel && (
                  <Button
                    color="error"
                    className="w-32 justify-center"
                    onClick={handleClickCancel}
                  >
                    No, Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

// interface NotificationContentProps {
//   message: any;
//   title?: string;
//   image?: string | any;
// }

const Success = ({ message, title, image }) => {
  return <MessageBody message={message} title={title} image={image} />;
};

const Info = ({ message, image, title }) => {
  return <MessageBody message={message} title={title} image={image} />;
};

const Warning = ({ message, title, image }) => {
  return <MessageBody message={message} title={title} image={image} />;
};

const Error = ({ message, title, image }) => {
  return <MessageBody message={message} title={title} image={image} />;
};
export const MessageBody = ({ message, title, image }) => {
  return (
    <>
      {image && <img src={image} alt="" className=" mb-6 w-20 h-20" />}
      <div className="flex flex-col w-full ">
        <div className="mb-3 text-center ">
          <h1 className="text-3xl text-gray-900 font-semibold pb-4">{title}</h1>
          <div
            className="text-gray-500 font-light max-w-lg mx-auto"
            dangerouslySetInnerHTML={{
              __html: `${message}`,
            }}
          />
          {/* <p className=" text-gray-500 font-light max-w-sm mx-auto ">
            {message}
          </p> */}
        </div>
      </div>
    </>
  );
};
export default Notification;
