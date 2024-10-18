import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
  click?: any;
}

function LinkButton({ to, children, click }: LinkButtonProps) {
  return (
    <div className="d-flex justify-content-center">
      <Link to={to}>
        <button onClick={click}>{children}</button>
      </Link>
    </div>
  );
}

export default LinkButton;
