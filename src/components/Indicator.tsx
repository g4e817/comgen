import { FC } from "react"
import WarningIndicator from "./WarningIndicator"

export enum IndicatorType {
  Error,
  Success,
  Warning
}

interface INFIndicatorProps {
  type: IndicatorType
  description: string
}

const Indicator: FC<INFIndicatorProps> = ({type, description}) => {

  //based on type render different indicator with switch statement

  const renderIndicator = () => {
    switch (type) {
      case IndicatorType.Warning:
        return <WarningIndicator description={description} />
      default:
        console.error('Indicator type not implemented')
        return 
    }
  }

  return renderIndicator()

}

export default Indicator
