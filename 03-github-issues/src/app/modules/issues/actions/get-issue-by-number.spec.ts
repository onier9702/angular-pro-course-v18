import { environment } from "../../../../environments/environment";
import { getIssueByNumber } from "./get-issue-by-number";

const issueNumber = '123';
const BASE_URL = environment.baseUrl;

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hello World',
};

describe('GetIssueByNumber action', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL);
  });

  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can not load issue`);
    }

    // expect(window.fetch).toHaveBeenCalledWith(requestURL);
  });
});
