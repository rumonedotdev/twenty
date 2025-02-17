import { ReactElement, useContext, useState } from 'react';
import styled from '@emotion/styled';

import { IconArrowUpRight } from '@/ui/display/icon';
import { useGetButtonIcon } from '@/ui/object/field/hooks/useGetButtonIcon';
import { useIsFieldEmpty } from '@/ui/object/field/hooks/useIsFieldEmpty';
import { useIsFieldInputOnly } from '@/ui/object/field/hooks/useIsFieldInputOnly';
import { HotkeyScope } from '@/ui/utilities/hotkey/types/HotkeyScope';

import { CellHotkeyScopeContext } from '../../contexts/CellHotkeyScopeContext';
import { ColumnIndexContext } from '../../contexts/ColumnIndexContext';
import { useGetIsSomeCellInEditMode } from '../../hooks/useGetIsSomeCellInEditMode';
import { useMoveSoftFocusToCurrentCellOnHover } from '../../hooks/useMoveSoftFocusToCurrentCellOnHover';
import { TableHotkeyScope } from '../../types/TableHotkeyScope';
import { useCurrentTableCellEditMode } from '../hooks/useCurrentTableCellEditMode';
import { useIsSoftFocusOnCurrentTableCell } from '../hooks/useIsSoftFocusOnCurrentTableCell';
import { useSetSoftFocusOnCurrentTableCell } from '../hooks/useSetSoftFocusOnCurrentTableCell';
import { useTableCell } from '../hooks/useTableCell';

import { TableCellButton } from './TableCellButton';
import { TableCellDisplayMode } from './TableCellDisplayMode';
import { TableCellEditMode } from './TableCellEditMode';
import { TableCellSoftFocusMode } from './TableCellSoftFocusMode';

const StyledCellBaseContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 32px;
  position: relative;
  user-select: none;
`;

export type TableCellContainerProps = {
  editModeContent: ReactElement;
  nonEditModeContent: ReactElement;
  editModeHorizontalAlign?: 'left' | 'right';
  editModeVerticalPosition?: 'over' | 'below';
  editHotkeyScope?: HotkeyScope;
  transparent?: boolean;
  maxContentWidth?: number;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const DEFAULT_CELL_SCOPE: HotkeyScope = {
  scope: TableHotkeyScope.CellEditMode,
};

export const TableCellContainer = ({
  editModeHorizontalAlign = 'left',
  editModeVerticalPosition = 'over',
  editModeContent,
  nonEditModeContent,
  editHotkeyScope,
}: TableCellContainerProps) => {
  const { isCurrentTableCellInEditMode } = useCurrentTableCellEditMode();

  const getIsSomeCellInEditMode = useGetIsSomeCellInEditMode();

  const [isHovered, setIsHovered] = useState(false);

  const moveSoftFocusToCurrentCellOnHover =
    useMoveSoftFocusToCurrentCellOnHover();

  const hasSoftFocus = useIsSoftFocusOnCurrentTableCell();

  const setSoftFocusOnCurrentTableCell = useSetSoftFocusOnCurrentTableCell();

  const { openTableCell } = useTableCell();

  const handleButtonClick = () => {
    setSoftFocusOnCurrentTableCell();
    openTableCell();
  };

  const handleContainerMouseEnter = () => {
    const isSomeCellInEditMode = getIsSomeCellInEditMode();

    if (!isHovered && !isSomeCellInEditMode) {
      setIsHovered(true);
      moveSoftFocusToCurrentCellOnHover();
    }
  };

  const handleContainerMouseLeave = () => {
    setIsHovered(false);
  };

  const editModeContentOnly = useIsFieldInputOnly();

  const isFirstColumnCell = useContext(ColumnIndexContext) === 0;

  const isEmpty = useIsFieldEmpty();

  const isFirstColumn = useContext(ColumnIndexContext) === 0;

  const customButtonIcon = useGetButtonIcon();

  const buttonIcon = isFirstColumn ? IconArrowUpRight : customButtonIcon;

  const showButton =
    !!buttonIcon &&
    hasSoftFocus &&
    !isCurrentTableCellInEditMode &&
    !editModeContentOnly &&
    (!isFirstColumnCell || !isEmpty);

  return (
    <CellHotkeyScopeContext.Provider
      value={editHotkeyScope ?? DEFAULT_CELL_SCOPE}
    >
      <StyledCellBaseContainer
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
      >
        {isCurrentTableCellInEditMode ? (
          <TableCellEditMode
            editModeHorizontalAlign={editModeHorizontalAlign}
            editModeVerticalPosition={editModeVerticalPosition}
          >
            {editModeContent}
          </TableCellEditMode>
        ) : hasSoftFocus ? (
          <>
            {showButton && (
              <TableCellButton onClick={handleButtonClick} Icon={buttonIcon} />
            )}
            <TableCellSoftFocusMode>
              {editModeContentOnly ? editModeContent : nonEditModeContent}
            </TableCellSoftFocusMode>
          </>
        ) : (
          <>
            {showButton && (
              <TableCellButton onClick={handleButtonClick} Icon={buttonIcon} />
            )}
            <TableCellDisplayMode>
              {editModeContentOnly ? editModeContent : nonEditModeContent}
            </TableCellDisplayMode>
          </>
        )}
      </StyledCellBaseContainer>
    </CellHotkeyScopeContext.Provider>
  );
};
