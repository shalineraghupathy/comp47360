import { ProgressBar } from "react-bootstrap";
interface BusynessProgressBarProps {
  busyness: number;
}

const BusynessProgressBar: React.FC<BusynessProgressBarProps> = ({
  busyness,
}) => {
  const getVariant = (busyness: number) => {
    if (busyness <= 33) return "success";
    if (busyness <= 66) return "warning";
    return "danger";
  };

  const getLabel = (busyness: number) => {
    if (busyness <= 33) return "Low";
    if (busyness <= 66) return "Medium";
    return "High";
  };

  return (
    <div>
      <ProgressBar
        now={busyness}
        label={`${getLabel(busyness)}`}
        variant={getVariant(busyness)}
      />
    </div>
  );
};

export default BusynessProgressBar;
