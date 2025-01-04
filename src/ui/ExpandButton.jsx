import Button from './Button'
import { ChevronDown, ChevronUp } from 'react-feather'
const ExpandButton = ({isExpanded,onSetExpanded}) => {
  return (
    <Button onClick={onSetExpanded}  className="text-malibu-300 font-semibold dark:text-malibu-200 rounded-full aspect-square  absolute right-0 bottom-0 mr-5 mb-5 bg-malibu-700 dark:bg-malibu-800 opacity-0 group-hover/task:opacity-100 hover:opacity-100 transition-all">{isExpanded?<ChevronUp/>:<ChevronDown/>}</Button>
)
}

export default ExpandButton