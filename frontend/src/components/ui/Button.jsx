import clsx from "clsx";

export default function Button({
  children,
  variant = "primary"
}) {
  return (
    <button
      className={clsx(
        "btn",
        variant === "secondary" && "btn-secondary"
      )}
    >
      {children}
    </button>
  );
}