import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { FC, useEffect, useState } from 'react'

interface WarningIndicatorProps {
  description: string
}

const WarningIndicator: FC<WarningIndicatorProps> = ({ description }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    void document.body.offsetWidth;

    setOpacity(1);
  }, []);

  return (
    <div
      className={`rounded-md bg-yellow-50 p-4 mb-4 transition-opacity duration-1000 ease-in-out opacity-${opacity}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Attention needed
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningIndicator;
