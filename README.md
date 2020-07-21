# hackathon-1

For this hackathon, you and your team will be collaborating to build a Weekly Planner.

## MVP Features

- User can view daily planner

    ![User can view daily planner](images/user-can-view-daily-planner.png)

- User can select day to view events

    ![User can select day to view events](images/user-can-select-day-to-view-events.png)

- User can add entry to day

    ![User can add entry to day](images/user-can-add-entry-to-day.png)

- User can update entry

    ![User can update entry](images/user-can-update-entry.png)

- User can delete entry

    ![User can delete entry](images/user-can-delete-entry.png)

- User can view total entries on a given day

    ![User can view total entries on a given day](images/user-can-view-total-entries-on-a-given-day.png)


## Stretch Features (optional)

- User can create repeating events
- Generate times using the JavaScript Date object
- User can plan multiple weeks
- Entries persist in `LocalStorage`

### Getting Started

**One** team member should create a new project on [MeisterTask](https://meistertask.com/app) and invite the other team members to collaborate. This is where your team will conduct task management for the hackathon. MeisterTask cards should be small action items.

### Coding Workflow

For this hackathon you will be collaborating with a small team of other developers and managing your source code with Git and GitHub. It is important that your team follow a strict workflow to keep everyone on the same page with respect to the project management and codebase.

1. First, **one** member of your team should fork this repository. They should share a link to the fork with every other team member.
2. Each member of your team should **clone** that **one** fork to their local `lfz/` directory. **💀 Do not fork the fork 💀**)
3. Each member of your team should check out a new branch from the `master` branch for the changes that they are about to make. Do not work directly on the master branch!
4. When a team member has completed their changes, they should push their branch up to GitHub and make a new Pull Request to merge their changes into `master`. If there are merge conflicts, do the following.
    - Check out `master` locally.
    - `git pull origin master` to make sure you have the latest commits for `master`
    - Check out the branch you were working on.
    - `git merge master` to make sure that your own branch is up-to-date
    - Fix merge conflicts if there are any
5. Have a team member review and approve the Pull Request.
6. Merge the pull request.
7. Check out `master` locally.
8. `git pull origin master` to sync your local `master` to GitHub's `master`.
9. Repeat for a new set of changes.

### Submitting the Final Code

Once all of your team's changes are done, you'll want to turn in your work. This repository has one branch per group. You'll want to:

1. Go to your fork's repository on GitHub.com.
1. Go to the **Pull Requests** tab.
1. Click the **New Pull Request** button.
1. Select `Learning-Fuze/hackathon-1` as the `base` repository.
1. Select `student-reviews` as the `base` branch.
1. Select your fork as the `head` repository.
1. Select your `master` branch as the `compare` branch.
1. Click **Create Pull Request**.
