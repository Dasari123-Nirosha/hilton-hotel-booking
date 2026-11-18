
import { SearchX } from "lucide-react";
import "./EmptyState.css";

function EmptyState({
  title = "Nothing Found",
  message = "There is nothing to display right now.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <SearchX size={38} />
      </div>

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
