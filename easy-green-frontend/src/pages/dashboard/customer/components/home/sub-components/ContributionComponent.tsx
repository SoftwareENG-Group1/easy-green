import { useEffect, useState } from "react";
import walletAdd from "../../../../../../assets/icons/wallet-add.svg";
import walletMinus from "../../../../../../assets/icons/wallet-minus.svg";
import { pxToViewport } from "../../../../../../utils/viewport";

export const ContributionComponent = () => {
  // State to store viewport values
  const [containerWidth, setContainerWidth] = useState(0);
  const [padding, setPadding] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const [marginBottomTitle, setMarginBottomTitle] = useState(0);
  const [marginBottomAmount, setMarginBottomAmount] = useState(0);
  const [buttonPaddingX, setButtonPaddingX] = useState(0);
  const [buttonPaddingY, setButtonPaddingY] = useState(0);
  const [buttonIconMargin, setButtonIconMargin] = useState(0);
  const [textLineHeight, setTextLineHeight] = useState(0);

  // States for modal functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'withdraw' | null>(null); // To determine if it's add or withdraw modal
  const [amount, setAmount] = useState<number>(0); // For the amount input

  const [balance, setBalance] = useState(5000); // Assuming initial balance is $5000

  // Calculate viewport values on component mount and window resize
  useEffect(() => {
    const calculateViewportValues = () => {
      // Container dimensions
      setContainerWidth(pxToViewport(433, "vw"));
      setPadding(pxToViewport(20, "vw"));
      setMarginRight(pxToViewport(29, "vw"));

      // Margins for elements
      setMarginBottomTitle(pxToViewport(10, "vw"));
      setMarginBottomAmount(pxToViewport(8, "vw"));

      // Button dimensions
      setButtonPaddingX(pxToViewport(10, "vw"));
      setButtonPaddingY(pxToViewport(2, "vw"));
      setButtonIconMargin(pxToViewport(10, "vw"));

      // Text line height
      setTextLineHeight(pxToViewport(28, "vh")); // Adjusted to scale vertically
    };

    calculateViewportValues();
    window.addEventListener("resize", calculateViewportValues);

    return () => window.removeEventListener("resize", calculateViewportValues);
  }, []);

  // Handle modal open
  const openModal = (type: 'add' | 'withdraw') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setAmount(0); // Reset amount
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  // Handle confirm action (add or withdraw money)
  const handleConfirm = () => {
    if (modalType === 'add') {
      setBalance(prevBalance => prevBalance + amount);
    } else if (modalType === 'withdraw' && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
    } else if (modalType === 'withdraw') {
      alert("Insufficient balance!");
    }
    closeModal();
  };

  return (
    <div
      className="bg-white flex flex-col rounded-[8px]"
      style={{
        width: `${containerWidth}vw`,
        padding: `${padding}vw`,
        marginRight: `${marginRight}vw`,
      }}
    >
      <p
        className="font-roboto text-[20px] text-black opacity-50"
        style={{
          marginBottom: `${marginBottomTitle}vw`,
        }}
      >
        Contribution
      </p>
      <p
        className="font-roboto font-semibold text-[34px] text-black"
        style={{
          marginBottom: `${marginBottomAmount}vw`,
        }}
      >
        ${balance}
      </p>
      <div className="flex justify-between">
        {/* Add Money Button */}
        <div
          className="bg-[#C2EAC3] flex rounded-[4px] cursor-pointer"
          style={{
            paddingLeft: `${buttonPaddingX}vw`,
            paddingRight: `${buttonPaddingX}vw`,
            paddingTop: `${buttonPaddingY}vw`,
            paddingBottom: `${buttonPaddingY}vw`,
          }}
          onClick={() => openModal('add')}
        >
          <img
            src={walletAdd}
            alt="Add Money"
            style={{
              marginRight: `${buttonIconMargin}vw`,
            }}
          />
          <p
            className="font-roboto text-[12px] text-black"
            style={{
              lineHeight: `${textLineHeight}vh`,
            }}
          >
            Add Money
          </p>
        </div>

        {/* Withdraw Money Button */}
        <div
          className="bg-[#EAC7C3] flex rounded-[4px] cursor-pointer"
          style={{
            paddingLeft: `${buttonPaddingX}vw`,
            paddingRight: `${buttonPaddingX}vw`,
            paddingTop: `${buttonPaddingY}vw`,
            paddingBottom: `${buttonPaddingY}vw`,
          }}
          onClick={() => openModal('withdraw')}
        >
          <img
            src={walletMinus}
            alt="Withdraw Money"
            style={{
              marginRight: `${buttonIconMargin}vw`,
            }}
          />
          <p
            className="font-roboto text-[12px] text-black"
            style={{
              lineHeight: `${textLineHeight}vh`,
            }}
          >
            Withdraw Money
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[80vw] md:w-[400px]">
            <h2 className="font-roboto text-[20px] text-black mb-4">
              {modalType === 'add' ? 'Add Money' : 'Withdraw Money'}
            </h2>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="w-full p-2 border-2 border-[#D6DEE0] rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-white bg-blue-600 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};