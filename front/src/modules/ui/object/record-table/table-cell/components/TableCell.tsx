import { FieldDisplay } from '@/ui/object/field/components/FieldDisplay';
import { FieldInput } from '@/ui/object/field/components/FieldInput';
import { FieldInputEvent } from '@/ui/object/field/types/FieldInputEvent';
import { HotkeyScope } from '@/ui/utilities/hotkey/types/HotkeyScope';

import { useMoveSoftFocus } from '../../hooks/useMoveSoftFocus';
import { useTableCell } from '../hooks/useTableCell';

import { TableCellContainer } from './TableCellContainer';

export const TableCell = ({
  customHotkeyScope,
}: {
  customHotkeyScope: HotkeyScope;
}) => {
  const { closeTableCell } = useTableCell();

  const { moveLeft, moveRight, moveDown } = useMoveSoftFocus();

  const handleEnter: FieldInputEvent = (persistField) => {
    persistField();
    closeTableCell();
    moveDown();
  };

  const handleSubmit: FieldInputEvent = (persistField) => {
    persistField();
    closeTableCell();
  };

  const handleCancel = () => {
    closeTableCell();
  };

  const handleEscape = () => {
    closeTableCell();
  };

  const handleTab: FieldInputEvent = (persistField) => {
    persistField();
    closeTableCell();
    moveRight();
  };

  const handleShiftTab: FieldInputEvent = (persistField) => {
    persistField();
    closeTableCell();
    moveLeft();
  };

  return (
    <TableCellContainer
      editHotkeyScope={customHotkeyScope}
      editModeContent={
        <FieldInput
          onCancel={handleCancel}
          onClickOutside={handleCancel}
          onEnter={handleEnter}
          onEscape={handleEscape}
          onShiftTab={handleShiftTab}
          onSubmit={handleSubmit}
          onTab={handleTab}
        />
      }
      nonEditModeContent={<FieldDisplay />}
    ></TableCellContainer>
  );
};
