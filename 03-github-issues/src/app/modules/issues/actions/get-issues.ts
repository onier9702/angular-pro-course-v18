import { sleep } from "../../../helpers/sleep";
import { GithubIssue, State } from "../interfaces/github-issue.interface";

export const getIssues = async (
  state: State,
  selectedLabels: string[],
): Promise<GithubIssue[]> => {

  await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state); // query params

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(`https://api.github.com/repos/angular/angular/issues?${params}`);

    if (!resp.ok) {
      throw 'Can not load issues';
    }

    const issues: GithubIssue[] = await resp.json();
    console.log(issues);

    return issues;
  } catch (error) {
    throw 'Can not load issues';
  }

}
