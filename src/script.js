// ==UserScript==
// @name         Github helper
// @namespace    https://github.com/m4rii0
// @version      0.3.1
// @description  Github helper
// @author       m4rii0
// @match        https://github.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @downloadURL  https://raw.githubusercontent.com/m4rii0/github-helper/stable/src/script.js
// @updateURL    https://raw.githubusercontent.com/m4rii0/github-helper/stable/src/script.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let previousPath;

  let pathObserver;
  let newBranchObserver;

  const config = {
    regexes: {
      'issue-list': /^\/[\w-]+\/[\w-]+\/issues\/?$/,
      'issue-detail': /^\/[\w-]+\/[\w-]+\/issues\/\d+$/
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
    const header = document.querySelector('.gh-header-actions');
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

    const target = document.querySelector('[data-target=\'create-issue-branch.details\']');
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
      if (mutation.type === 'childList' && mutation.target.getAttribute('aria-label') === 'Create a branch for this issue') {
        document.getElementById('branch-name').value = getBranchName();
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
    let title = document.querySelector('h1 > span.js-issue-title').innerText;
    title = title.trim().toLowerCase().replaceAll(' ', '-');

    let issueId = document.querySelector('h1 > .f1-light').innerText;
    issueId = issueId.replace('#', '');

    let kind = [...document.querySelectorAll('.js-issue-labels a span')].map(e => e.innerText).find(e => e.startsWith('kind/'));
    if (!kind) kind = 'CHANGEME';

    kind = kind.replace('kind/', '');
    const prefix = getBranchPrefix(kind);
    return `${prefix}/GH-${issueId}-${title}`;
  }


  const init = () => {
    pathObserver = new MutationObserver(onPathChangeCallback);
    let target = document.querySelector('.application-main');
    if (!target) return;

    pathObserver.observe(target, { childList: true, subtree: true });
  }

  init();
})();