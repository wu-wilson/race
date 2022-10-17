import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({
  options,
  value,
  setValue,
  width,
  height,
}: {
  options: string[];
  value: string;
  setValue: (val: string) => void;
  width: number;
  height?: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen(!open);
  };

  // Close dropdown menu when the user clicks outside.
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.preventDefault();
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles["container"]}
      style={{ width: width, height: height ? height : 50 }}
      onClick={toggle}
    >
      {value}
      {open ? (
        <RiArrowUpSFill className={styles["arrow"]} size={20} />
      ) : (
        <RiArrowDownSFill className={styles["arrow"]} size={20} />
      )}
      {open ? (
        <div
          className={styles["menu"]}
          style={{ width: width, top: height ? height : 50 }}
        >
          {options.map((option) => (
            <div
              key={option}
              className={styles["option"]}
              onClick={() => setValue(option)}
            >
              {option}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
