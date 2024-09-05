// ==UserScript==
// @name         Github helper
// @namespace    https://github.com/m4rii0
// @version      1.2.3
// @description  Github helper to speed up your work
// @author       m4rii0
// @match        https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @downloadURL  https://raw.githubusercontent.com/m4rii0/github-helper/stable/src/helper.user.js
// @updateURL    https://raw.githubusercontent.com/m4rii0/github-helper/stable/src/helper.user.js
// @grant        none
// @license      GNU General Public License v3.0
// ==/UserScript==

(function () {
  'use strict';

  let previousPath;

  let pathObserver;
  let newBranchObserver;

  const config = {
    regexes: {
      'issue-list': /^.*\/issues\/?$/,
      'issue-detail': /^.*\/issues\/\d+$/
    },
  };

  /* UI STUFF */
  const pathType = () => {
    const path = window.location.pathname;
    if (!path) return;

    return Object.keys(config.regexes).find(key => config.regexes[key].test(path));
  }

  const onPathChange = (currentPathType) => {
    if (currentPathType === 'issue-detail') {
      createButton();
      initNewBranchObserver();
    }
  }

  const createButton = () => {
    const header = document.querySelector('[data-component=\'PH_Actions\'] > div, .gh-header-actions');
    if (!header) return;

    let button = document.createElement('button');
    button.id = 'button-generate-branch-name';
    button.innerText = '★ Generate branch name';
    button.classList.add('btn', 'btn-sm', 'mr-2');
    button.onclick = () => prompt('Branch name', getBranchName());

    header.prepend(button);
  }

  const initNewBranchObserver = () => {
    newBranchObserver = new MutationObserver(newBranchCallBack);

    const target = document.querySelector('[data-target=\'create-branch.details\']');
    if (!target) return;
    newBranchObserver.observe(target, { childList: true, attributes: true, subtree: true });
  }

  /* CALLBACKS */
  const onPathChangeCallback = () => {
    const path = window.location.pathname;
    if (path === previousPath) return;

    const currentPathType = pathType();
    if (!currentPathType) return;

    onPathChange(currentPathType);

    previousPath = path;
  }

  const newBranchCallBack = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList' && mutation.target.getAttribute('aria-label') === 'Create a branch') {
        document.getElementById('name').value = getBranchName();
        break;
      }
    }
  }

  /* HELPERS */
  const getBranchPrefix = (kind) => {
    let prefix;
    switch (kind) {
      case 'bug':
        prefix = 'bugfix';
        break;
      default:
        prefix = kind;
        break;
    }

    return prefix;
  }

  const getBranchName = () => {
    let title = document.querySelector('[data-testid="issue-title"], h1 > bdi.js-issue-title').textContent;
    title = title
              .trim()
              .toLowerCase()
              .replaceAll(' ', '-')
              .replace(/[^\w\-]+/g, '');

    let issueId = document.querySelector('[data-testid="issue-title"] + div>a, h1 > .f1-light').textContent;
    issueId = issueId.replace('#', '');

    let kind = [...document.querySelectorAll('[data-testid="issue-labels"] > a > span, .js-issue-labels > a > span')].map(e => e.textContent).find(e => e.startsWith('kind/'));
    if (!kind) kind = 'CHANGEME';

    kind = kind.replace('kind/', '');
    const prefix = getBranchPrefix(kind);

    let branchName = `${prefix}/GH-${issueId}-${title}`;
    branchName = branchName.substring(0, calculateMaxBranchNameLength());
    return branchName.replace(/\-$/, ''); // removing trailing hyphens
  }

  const calculateMaxBranchNameLength = () => {
    const MAX_BRANCH_NAME_LENGTH = 63;

    const repoNameLength = window.location.pathname.split('/')[2].length;

    return MAX_BRANCH_NAME_LENGTH - repoNameLength;
  }


  const init = () => {
    pathObserver = new MutationObserver(onPathChangeCallback);
    let target = document.querySelector('.application-main');
    if (!target) return;

    pathObserver.observe(target, { childList: true, subtree: true });
  }

  init();
})();
