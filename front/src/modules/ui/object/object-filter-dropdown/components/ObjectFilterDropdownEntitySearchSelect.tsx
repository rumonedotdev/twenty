import { useEffect, useState } from 'react';

import { EntitiesForMultipleEntitySelect } from '@/ui/input/relation-picker/components/MultipleEntitySelect';
import { SingleEntitySelectBase } from '@/ui/input/relation-picker/components/SingleEntitySelectBase';
import { EntityForSelect } from '@/ui/input/relation-picker/types/EntityForSelect';
import { ViewFilterOperand } from '@/views/types/ViewFilterOperand';

import { useFilter } from '../hooks/useFilter';

export const ObjectFilterDropdownEntitySearchSelect = ({
  entitiesForSelect,
}: {
  entitiesForSelect: EntitiesForMultipleEntitySelect<EntityForSelect>;
}) => {
  const {
    setObjectFilterDropdownSelectedEntityId,
    filterDefinitionUsedInDropdown,
    selectedOperandInDropdown,
    objectFilterDropdownSearchInput,
    selectedFilter,
    selectFilter,
  } = useFilter();

  const [isAllEntitySelected, setIsAllEntitySelected] = useState(false);

  const handleUserSelected = (
    selectedEntity: EntityForSelect | null | undefined,
  ) => {
    if (
      !filterDefinitionUsedInDropdown ||
      !selectedOperandInDropdown ||
      !selectedEntity
    ) {
      return;
    }

    if (isAllEntitySelected) {
      setIsAllEntitySelected(false);
    }

    setObjectFilterDropdownSelectedEntityId(selectedEntity.id);

    selectFilter?.({
      displayValue: selectedEntity.name,
      fieldId: filterDefinitionUsedInDropdown.fieldId,
      operand: selectedOperandInDropdown,
      value: selectedEntity.id,
      displayAvatarUrl: selectedEntity.avatarUrl,
      definition: filterDefinitionUsedInDropdown,
    });
  };

  const isAllEntitySelectShown =
    !!filterDefinitionUsedInDropdown?.selectAllLabel &&
    !!filterDefinitionUsedInDropdown?.SelectAllIcon &&
    (isAllEntitySelected ||
      filterDefinitionUsedInDropdown?.selectAllLabel
        .toLocaleLowerCase()
        .includes(objectFilterDropdownSearchInput.toLocaleLowerCase()));

  const handleAllEntitySelectClick = () => {
    if (
      !filterDefinitionUsedInDropdown ||
      !selectedOperandInDropdown ||
      !filterDefinitionUsedInDropdown.selectAllLabel
    ) {
      return;
    }

    setIsAllEntitySelected(true);
    setObjectFilterDropdownSelectedEntityId(null);

    selectFilter?.({
      displayValue: filterDefinitionUsedInDropdown.selectAllLabel,
      fieldId: filterDefinitionUsedInDropdown.fieldId,
      operand: ViewFilterOperand.IsNotNull,
      value: '',
      definition: filterDefinitionUsedInDropdown,
    });
  };

  useEffect(() => {
    if (!selectedFilter) {
      setObjectFilterDropdownSelectedEntityId(null);
    } else {
      setObjectFilterDropdownSelectedEntityId(selectedFilter.value);
      setIsAllEntitySelected(
        selectedFilter.operand === ViewFilterOperand.IsNotNull,
      );
    }
  }, [
    selectedFilter,
    setObjectFilterDropdownSelectedEntityId,
    entitiesForSelect.selectedEntities,
  ]);

  return (
    <>
      <SingleEntitySelectBase
        entitiesToSelect={entitiesForSelect.entitiesToSelect}
        selectedEntity={entitiesForSelect.selectedEntities[0]}
        loading={entitiesForSelect.loading}
        onEntitySelected={handleUserSelected}
        SelectAllIcon={filterDefinitionUsedInDropdown?.SelectAllIcon}
        selectAllLabel={filterDefinitionUsedInDropdown?.selectAllLabel}
        isAllEntitySelected={isAllEntitySelected}
        isAllEntitySelectShown={isAllEntitySelectShown}
        onAllEntitySelected={handleAllEntitySelectClick}
      />
    </>
  );
};
