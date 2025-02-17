import { useRecoilState } from 'recoil';

import { useAvailableScopeIdOrThrow } from '@/ui/utilities/recoil-scope/scopes-internal/hooks/useAvailableScopeId';
import { getScopedState } from '@/ui/utilities/recoil-scope/utils/getScopedState';

import { UNDEFINED_FAMILY_ITEM_ID } from '../../constants';
import { ViewScopeInternalContext } from '../../scopes/scope-internal-context/ViewScopeInternalContext';
import { currentViewIdScopedState } from '../../states/currentViewIdScopedState';
import { getViewScopedStates } from '../../utils/internal/getViewScopedStates';

export const useViewScopedStates = (args?: { customViewScopeId?: string }) => {
  const { customViewScopeId } = args ?? {};

  const scopeId = useAvailableScopeIdOrThrow(
    ViewScopeInternalContext,
    customViewScopeId,
  );

  // View
  const [currentViewId] = useRecoilState(
    getScopedState(currentViewIdScopedState, scopeId),
  );

  const viewId = currentViewId ?? UNDEFINED_FAMILY_ITEM_ID;

  const {
    availableFieldDefinitionsState,
    availableFilterDefinitionsState,
    availableSortDefinitionsState,
    canPersistFiltersSelector,
    canPersistSortsSelector,
    currentViewFieldsState,
    currentViewFiltersState,
    currentViewIdState,
    currentViewSelector,
    currentViewSortsState,
    entityCountInCurrentViewState,
    isViewBarExpandedState,
    onViewFieldsChangeState,
    onViewFiltersChangeState,
    onViewSortsChangeState,
    savedViewFieldsByKeySelector,
    savedViewFieldsState,
    savedViewFiltersByKeySelector,
    savedViewFiltersState,
    savedViewSortsByKeySelector,
    savedViewSortsState,
    viewEditModeState,
    viewObjectIdState,
    viewTypeState,
    viewsState,
  } = getViewScopedStates({
    viewScopeId: scopeId,
    viewId,
  });

  return {
    availableFieldDefinitionsState,
    availableFilterDefinitionsState,
    availableSortDefinitionsState,
    canPersistFiltersSelector,
    canPersistSortsSelector,
    currentViewFieldsState,
    currentViewFiltersState,
    currentViewIdState,
    currentViewSelector,
    currentViewSortsState,
    entityCountInCurrentViewState,
    isViewBarExpandedState,
    onViewFieldsChangeState,
    onViewFiltersChangeState,
    onViewSortsChangeState,
    savedViewFieldsByKeySelector,
    savedViewFieldsState,
    savedViewFiltersByKeySelector,
    savedViewFiltersState,
    savedViewSortsByKeySelector,
    savedViewSortsState,
    viewEditModeState,
    viewObjectIdState,
    viewTypeState,
    viewsState,
  };
};
