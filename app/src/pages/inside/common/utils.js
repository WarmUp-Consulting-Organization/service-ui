/*
 * Copyright 2019 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { COMMON_LOCALE_KEYS } from 'common/constants/localization';
import { canBulkEditItems } from 'common/utils/permissions';
import { isPostIssueActionAvailable } from 'controllers/plugins';
import { actionMessages, ISSUE_OPERATION_MAX_ITEMS } from './constants';

export const getIssueTitle = (
  formatMessage,
  btsIntegrations,
  isBtsPluginsExist,
  enabledBtsPlugins,
  isPostIssueUnavailable,
) => {
  if (!isBtsPluginsExist) {
    return formatMessage(actionMessages.noBtsPlugin);
  }

  if (!enabledBtsPlugins.length) {
    return formatMessage(actionMessages.noAvailableBtsPlugin);
  }

  if (!btsIntegrations.length) {
    return formatMessage(actionMessages.noBtsIntegration);
  }

  if (isPostIssueUnavailable) {
    return formatMessage(actionMessages.btsIntegrationIsNotConfigured);
  }

  return '';
};

export const createStepActionDescriptors = (params) => {
  const {
    historyView = false,
    formatMessage,
    debugMode,
    onEditDefects,
    onEditItems,
    onPostIssue,
    onLinkIssue,
    onUnlinkIssue,
    onIgnoreInAA,
    onIncludeInAA,
    onDelete,
    btsIntegrations,
    isBtsPluginsExist,
    enabledBtsPlugins,
    accountRole,
    projectRole,
    selectedItems = [],
  } = params;
  const isIssueOperationDisabled = selectedItems.length > ISSUE_OPERATION_MAX_ITEMS;
  const isPostIssueUnavailable =
    isIssueOperationDisabled || !isPostIssueActionAvailable(btsIntegrations);
  const issueTitle = isIssueOperationDisabled
    ? formatMessage(actionMessages.issueActionUnavailable)
    : getIssueTitle(
        formatMessage,
        btsIntegrations,
        isBtsPluginsExist,
        enabledBtsPlugins,
        isPostIssueUnavailable,
      );

  return [
    {
      label: formatMessage(COMMON_LOCALE_KEYS.EDIT_ITEMS),
      value: 'action-edit',
      hidden: !canBulkEditItems(accountRole, projectRole),
      onClick: onEditItems,
    },
    {
      label: formatMessage(actionMessages.editDefects),
      value: 'action-edit-defects',
      onClick: onEditDefects,
      disabled: isIssueOperationDisabled,
      title: isIssueOperationDisabled ? issueTitle : '',
    },
    {
      label: formatMessage(actionMessages.postIssue),
      value: 'action-post-issue',
      hidden: debugMode,
      disabled: isPostIssueUnavailable,
      title: isPostIssueUnavailable ? issueTitle : '',
      onClick: onPostIssue,
    },
    {
      label: formatMessage(actionMessages.linkIssue),
      value: 'action-link-issue',
      hidden: debugMode,
      disabled: !btsIntegrations.length || isIssueOperationDisabled,
      title: btsIntegrations.length && !isIssueOperationDisabled ? '' : issueTitle,
      onClick: onLinkIssue,
    },
    {
      label: formatMessage(actionMessages.unlinkIssue),
      value: 'action-unlink-issue',
      hidden: debugMode,
      onClick: onUnlinkIssue,
      disabled: isIssueOperationDisabled,
      title: isIssueOperationDisabled ? issueTitle : '',
    },
    {
      label: formatMessage(actionMessages.ignoreInAA),
      value: 'action-ignore-in-AA',
      hidden: debugMode || historyView,
      onClick: onIgnoreInAA,
    },
    {
      label: formatMessage(actionMessages.includeInAA),
      value: 'action-include-into-AA',
      hidden: debugMode || historyView,
      onClick: onIncludeInAA,
    },
    {
      label: formatMessage(COMMON_LOCALE_KEYS.DELETE),
      value: 'action-delete',
      onClick: onDelete,
    },
  ];
};
