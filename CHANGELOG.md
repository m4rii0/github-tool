# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2024-09-05

### Fixed

- Broken issue details after GitHub added new [Issue Types](https://github.com/orgs/community/discussions/112806) and [Sub-issues](https://github.com/orgs/community/discussions/131957)

## [1.2.3] - 2024-09-05

### Fixed

- Broken header selector after GitHub added new [Issue Types](https://github.com/orgs/community/discussions/112806) and [Sub-issues](https://github.com/orgs/community/discussions/131957)

## [1.2.2] - 2023-01-13

### Fixed

- Broken selector after GitHub updated the issue details page

## [1.2.1] - 2022-08-11

### Fixed

- Branch names can no longer end with a hyphens

## [1.2.0] - 2022-06-22

### Added

- The branch generated now follows RFC 1035 taking in consideration the repository name.

### Fixed

- Replacement of wrong characters while generating the branch name.

## [1.1.2] - 2022-06-21

### Fixed

- #8 Default text in the `Create new branch` modal is not being replaced.

## [1.1.1] - 2022-04-26

### Fixed

- Max length of branch is now configured as 60 characters.

## [1.1.0] - 2022-04-26

### Improved

- Generated branch name now limits to 60 characters
- Generated branch name now removes non-basic characters

## [1.0.0] - 2022-04-25

- v1 release 🥳
- New README
- Added LICENSE

### Breaking Changes

- Script remote name was renamed to `helper.user.js` breaking the remote reference in the previous releases.
A fresh installation is required to use the new remote name and get updates automatically. (Get it [here](https://raw.githubusercontent.com/m4rii0/github-helper/stable/src/helper.user.js))

## [0.3.3] - 2022-04-20

### Fixed

- Now loading the button and the text in all repos

## [0.3.2] - 2022-04-18

### Fixed

- Fixed issue that in some occasions the default branch name wasn't being replaced
- Removed button appearing in the pull requests section

### Refactored

- Refactored internal UI watcher to make it easy to check changes in the UI

## [0.3.1] - 2022-04-06

### Fixed

- Fixed a bug where text wasn't replaced on Firefox

## [0.3.0] - 2022-04-06

### Changed

- Versioning moved to Semantic Versioning

### Fixed

- Button and text on the 'Create a Branch' not appearing in some cases.

- Message not being generated if a `kind` label is not found.

## [0.2] - 2022-04-04

- First release

[1.2.3]: https://github.com/m4rii0/github-helper/tree/1.2.3
[1.2.2]: https://github.com/m4rii0/github-helper/tree/1.2.2
[1.2.1]: https://github.com/m4rii0/github-helper/tree/1.2.1
[1.2.0]: https://github.com/m4rii0/github-helper/tree/1.2.0
[1.1.2]: https://github.com/m4rii0/github-helper/tree/1.1.2
[1.1.1]: https://github.com/m4rii0/github-helper/tree/1.1.1
[1.1.0]: https://github.com/m4rii0/github-helper/tree/1.1.0
[1.0.0]: https://github.com/m4rii0/github-helper/tree/1.0.0
[0.3.3]: https://github.com/m4rii0/github-helper/tree/0.3.3
[0.3.2]: https://github.com/m4rii0/github-helper/tree/0.3.2
[0.3.1]: https://github.com/m4rii0/github-helper/tree/0.3.1
[0.3.0]: https://github.com/m4rii0/github-helper/tree/0.3.0
[0.2]: https://github.com/m4rii0/github-helper/tree/0.2
