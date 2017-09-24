import 'babel-polyfill';

describe('models/index', () => {
  it('returns the candidate model', () => {
    const { models } = require('../');

    expect(models.Candidate).toBeTruthy();
  });

  it('returns the candidate supporter model', () => {
    const { models } = require('../');
    expect(models.CandidateSupporter).toBeTruthy();
  });

  it('returns the site model', () => {
    const { models } = require('../');
    expect(models.Site).toBeTruthy();
  });

  it('returns the vote model', () => {
    const { models } = require('../');
    expect(models.Vote).toBeTruthy();
  });

  it('returns the user model', () => {
    const { models } = require('../');
    expect(models.User).toBeTruthy();
  });

  it('returns the social model', () => {
    const { models } = require('../');
    expect(models.Social).toBeTruthy();
  });
});
