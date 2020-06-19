import * as React from 'react';
import Checkbox from '@/components/atoms/checkbox';
import classNames from 'classnames';
import Option, { OptionRendererProps } from './option';

export type Size = 'regular' | 'tiny';

export interface CheckboxProps {
  checked?: boolean;
  group?: string;
  selectedGroup?: boolean;
  label: string;
  value: any;
}

export interface ListCheckboxProps extends OptionRendererProps {
  label?: string;
  showParentCheckbox?: boolean;
  checked?: boolean;
  bufferedOption?: CheckboxProps;
  showGroups?: boolean;
  list: CheckboxProps[];
  updatedSelectedArray?: boolean[];
  style?: React.CSSProperties;
  selected?: any[];
  selectedLabels?: string[];
  optionsLength: number;
  remainingOptions: number;
  cursor: number;
  onChange?: (childArray: number[], labels: string[], parent: boolean) => void;
  onUpdateSelected?: (selected: number[]) => void;
  renderFooter: () => JSX.Element;
  renderGroups: (group: string, selectedGroup?: boolean) => JSX.Element;
  updateActiveOption: (index: number, parentCheckbox?: boolean) => void;
}

export const ListCheckbox = React.forwardRef<HTMLDivElement, ListCheckboxProps>((props, ref) => {
  const {
    list,
    showParentCheckbox = true,
    remainingOptions,
    renderFooter,
    renderGroups,
    showGroups,
    bufferedOption,
    selected = [],
    selectedLabels = [],
    optionsLength,
    updatedSelectedArray,
    optionRenderer,
    onChange,
    label,
    style,
  } = props;

  const childArray = props.checked ? Array(list.length).fill(props.checked) : [];

  if (!props.checked) {
    list.map(item => {
      const { checked: childChecked = false } = item;
      childArray.push(childChecked);
    });
  }

  const getLabelsFromList = (optionsList: any) => {
    const labels: string[] = [];
    optionsList.forEach((option: any) => {
      labels.push(option.label);
    });

    return labels;
  };

  const getValuesFromList = (optionsList: any) => {
    const values: any[] = [];
    optionsList.forEach((option: any) => {
      values.push(option.value);
    });

    return values;
  };

  const calcParentStatus = (selectedValues: number[]) => {
    const optionsListLength = (selected && selected.length > 0) ? optionsLength : list.length;
    const indeterminateTrue = selectedValues.length < optionsListLength && selectedValues.length > 0;
    const checkedTrue = selectedValues.length === optionsListLength;
    const obj = { checked: props.checked ? props.checked : checkedTrue, indeterminate: indeterminateTrue };
    return obj;
  };

  const [parentStatus, setParentStatus] = React.useState(calcParentStatus(selected));
  const [checked, setChecked] = React.useState(childArray);
  const [selectedArrayLabels, setSelectedArrayLabels] = React.useState<string[]>(selectedLabels);
  const [selectedArrayValues, setSelectedArrayValues] = React.useState(selected);

  const SelectAllClass = classNames({
    ['Option']: true,
    ['Option-wrapper']: true,
    ['Option--top']: true,
    ['Option--active']: props.cursor === 0
  });

  React.useEffect(() => {
    if (updatedSelectedArray && updatedSelectedArray.length > 0) {
      setChecked(updatedSelectedArray);
    }
  }, [JSON.stringify(updatedSelectedArray)]);

  React.useEffect(() => {
    if (selected && selected.length > 0 && parentStatus.checked) {
      setSelectedArrayValues(selected);
      setSelectedArrayLabels(selectedLabels);
    }
  }, [JSON.stringify(selected)]);

  React.useEffect(() => {
    if (props.checked !== undefined) {
      setParentStatus({ ...parentStatus, checked: props.checked! });
    }
  }, [props.checked]);

  const handleChildChange = (checkedValue: boolean, index: number) => {
    const updateCheck = [...checked];
    updateCheck[index] = checkedValue;

    const valueArray = selectedArrayValues.slice();
    const labelsArray = selectedArrayLabels.slice();

    if (!checkedValue) {
      const ind = labelsArray.indexOf(list[index].label);
      valueArray.splice(ind, 1);
      labelsArray.splice(ind, 1);
    }

    const selectedLabelsCopy = checkedValue ? labelsArray.concat(list[index].label) : labelsArray;
    const selectedValuesCopy = checkedValue ? valueArray.concat(list[index].value) : valueArray;
    const obj = calcParentStatus(selectedValuesCopy);
    setChecked(updateCheck);
    setParentStatus(obj);
    setSelectedArrayLabels(selectedLabelsCopy);
    setSelectedArrayValues(selectedValuesCopy);

    if (onChange) {
      onChange(selectedValuesCopy, selectedLabelsCopy, false);
    }
  };

  const handleParentChange = (checkedValue: boolean, indeterminate: boolean = false) => {
    const updatedArray = [...childArray].fill(checkedValue);
    const optionsList = (selected && selected.length > 0) ? selectedArrayValues.slice() : getValuesFromList(list);
    const labelsList = (selected && selected.length > 0) ? selectedArrayLabels.slice() : getLabelsFromList(list);
    const selectedValues = checkedValue ? optionsList : [];
    const selectedLabelsCopy = checkedValue ? labelsList : [];
    setChecked(updatedArray);
    setSelectedArrayValues(selectedValues);
    setSelectedArrayLabels(selectedLabelsCopy);
    setParentStatus({ indeterminate, checked: checkedValue });

    if (onChange) {
      onChange(selectedValues, selectedLabelsCopy, true);
    }
  };

  const onUpdateActiveOption = () => {
    if (props.updateActiveOption) props.updateActiveOption(0, true);
  };

  return (
    <div className={'ListCheckbox'}>
      {
        showParentCheckbox && (
          <div className={SelectAllClass} onMouseEnter={onUpdateActiveOption}>
            <Checkbox
              label={label}
              onChange={handleParentChange}
              checked={parentStatus.checked}
              indeterminate={parentStatus.indeterminate}
              tabIndex={-1}
            />
          </div>
        )
      }
      <div className={'ListCheckbox-scroller'} style={style} ref={ref}>
        {
          list.map((item, ind) => {
            const { group, selectedGroup, value, label: childLabel } = item;
            const prevGroup = ind > 0 ?
              list[ind - 1].group : bufferedOption ? bufferedOption.group : undefined;
            const isGroup = showGroups && prevGroup !== group;

            const top = !showParentCheckbox && ind === 0 && !showGroups;
            const bottom = ind + 1 === list.length && !(showGroups && remainingOptions > 0);
            const active = showParentCheckbox ? ind + 1 === props.cursor : ind === props.cursor;

            return (
              <div key={`checkbox-${ind}`}>
                {isGroup && group && renderGroups(group, selectedGroup)}
                <Option
                  optionData={{ value, label: childLabel }}
                  active={active}
                  selected={checked[ind]}
                  optionRenderer={optionRenderer}
                  index={ind}
                  optionIsTop={top}
                  optionIsBottom={bottom}
                  updateActiveOption={props.updateActiveOption}
                  checkboxes={true}
                  onChange={c => {
                    handleChildChange(c, ind);
                  }}
                />
              </div>
            );
          })
        }
        {showGroups && remainingOptions > 0 && renderFooter()}
      </div>
    </div>
  );
});

ListCheckbox.displayName = 'ListCheckbox';

export default ListCheckbox;