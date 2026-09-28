// const { test, expect, chromium } = require('@playwright/test');
// const fs = require('fs');
// const jsonUtils = require('../../utils/jsonUtils');
// const CDPageWithCommentsComponent = require('../../Pages/CDPageWithCommentsComponent');
// const Environment = require('../../Data/Environment');
// const CDLoginPage = require('../../Pages/CDLogin.page');
// const { title } = require('process');
// var xlsx = require('node-xlsx').default;

// let cdPage;
// let cdContext;
// let browser;
// let CDState;
// let articlePage;
// let cdPage2;
// let cdPage3;
// let cdPage4;
// let cdContext2;
// let cdContext3;
// let cdContext4;
// let numberOfComments = 8;
// //open id users
// //let alexUsername = 'alexw@dozen.openid';
// //let allenUsername = 'allank@dozen.openid';
// //let skyebUser = 'skyeb@dozen.openid';
// //let johnqUser = 'johnq@dozen.openid';
// //let password = 'Xyz78901';

// //azure users
// let alexUsername = 'AlexW@M365x299303.OnMicrosoft.com';
// let allenUsername = 'AllanD@M365x299303.OnMicrosoft.com';
// let skyebUser = 'crystal@m365x299303.onmicrosoft.com';
// let johnqUser = 'brianj@m365x299303.onmicrosoft.com';
// let password = 'OMT2Km641B';

// test.describe('Page With Comments component CD Tests', () => {
//   test.beforeAll(async () => {

//     //getting CD state to pass to the new browsers
//     CDState = JSON.parse(fs.readFileSync('CDstate.json'));

//   })

//   test.beforeEach(async () => {

//     //start browsers with the correct states for CM and CD
//     browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
//     cdContext = await browser.newContext({ viewport: null, storageState: CDState });

//     cdPage = await cdContext.newPage();
//     articlePage = new CDPageWithCommentsComponent(cdPage);

//     await articlePage.goTo();
//     //await cdPage.goto('https://dz3qacd.dozen.ai/Automation/Comments-page');

//   })

//   test('Validate [There are no comments to show] Message', async () => {

//     //let message = articlePage.GetCommentMessage();
//     let isDisplayed = await cdPage.locator(articlePage.noCommentsElement).isVisible();
//     if (isDisplayed == true) {
//       let message = await cdPage.locator(articlePage.noCommentsElement).innerText();
//       expect(articlePage.noCommentsElement).toContain('There are no comments to show');
//     } else {
//       const locator = await cdPage.locator(articlePage.noCommentsElement);
//       await expect(locator).toBeHidden();
//     }
//     // if(message != null){
//     //await cdPage.locator('text=There are no comments to show');
//     //  expect(articlePage.noCommentsElement).toContain('There are no comments to show');
//     //}
//   })

//   test('Add 7 Comments', async () => {

//     let text = 'comment';
//     let count = 0;
//     //check if there is comments or not
//     let isDisplayed = await cdPage.locator(articlePage.noCommentsElement).isVisible();
//     if (!isDisplayed) {
//       //get the comments count
//       count = await cdPage.locator(articlePage.commentsCount).innerText();
//     }
//     for (let i = 1; i < numberOfComments; i++) {
//       //add comment
//       await articlePage.addComment(text + i);
//     }

//     await articlePage.waitFor(2000);
//     //set the new count after adding 7 comments 
//     let newCount = count + 7;
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(newCount.toString());
//   })


//   test('Add 7 replies for the first comment', async () => {

//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     let text = 'reply';
//     for (let i = 1; i < numberOfComments; i++) {
//       await articlePage.addReply(text + i);
//     }

//     let countAfterAddReply = parseInt(countOfComments) + (numberOfComments - 1);
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(countAfterAddReply.toString());

//   })

//   test('Validate Load More Replies button', async () => {
//     let isLoadMoreButtonExist = await cdPage.locator(`${articlePage.loadMoreReplies}`).isVisible();
//     while (isLoadMoreButtonExist) {
//       await articlePage.clickOnLoadMoreRepliesButton();
//       isLoadMoreButtonExist = await cdPage.locator(`${articlePage.loadMoreReplies}`).isVisible();
//     }
//     await expect(await cdPage.locator(articlePage.loadMoreReplies)).toBeHidden();

//   })

//   test('Edit first reply', async () => {

//     let text = 'updated reply';
//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     await articlePage.editFirstReply(text);
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(countOfComments);
//     let firstReply = await cdPage.locator(articlePage.firstReply);
//     await expect(firstReply).toContainText(text);
//   })

//   test('Add and Delete Love Reaction for the first Reply', async () => {

//     await articlePage.clickOnLoveReactionButtonForTheFirstReply();
//     await expect(await cdPage.locator(articlePage.replyLoveReactionInReactionsSummary)).toBeVisible();
//     await expect(await cdPage.locator(articlePage.totalNumberOfLoveReactionsForTheFirstReply)).toContainText('1');

//     await articlePage.clickOnLoveReactionButtonForTheFirstReply();
//     await expect(await cdPage.locator(articlePage.replyReactionSummary)).toBeHidden();

//   })

//   test('Delete all Replies', async () => {
//     test.setTimeout(30000);
//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     let loadMoreButton = await cdPage.$$(`${articlePage.loadMoreReplies}`);
//     while (loadMoreButton.length > 0) {
//       await articlePage.clickOnLoadMoreRepliesButton();
//       loadMoreButton = await cdPage.$$(`${articlePage.loadMoreReplies}`);
//     }
//     for (let i = 1; i < numberOfComments; i++) {
//       await articlePage.deleteFirstReply();
//       await articlePage.waitFor(1000);
//     }
//     let countAfterDeletingTheReplies = parseInt(countOfComments) - (parseInt(numberOfComments) - 1);
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(countAfterDeletingTheReplies.toString());

//   })

//   test('Validate the Total number Of comments in the interaction summary component', async () => {

//     let totalNumberInTheSummary = await cdPage.locator(articlePage.interactionSummaryTotalNumberOfComments);
//     let count = await cdPage.locator(articlePage.commentsCount).innerText();
//     await expect(totalNumberInTheSummary).toContainText(count);
//   })

//   test('Edit first comment', async () => {

//     let text = 'updated';
//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     await articlePage.editFirstComment(text);
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(countOfComments);
//     let firstComment = await cdPage.locator(articlePage.firstComment);
//     await expect(firstComment).toContainText(text);
//   })

//   test('Delete First Comment', async () => {

//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     await articlePage.deleteFirstComment();
//     let countAfterDeletingTheComment = parseInt(countOfComments) - 1;
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(countAfterDeletingTheComment.toString());

//   })

//   test('Validate Load More button', async () => {

//     let isLoadMoreButtonExist = await cdPage.locator(`${articlePage.loadMoreButton}`).isVisible();
//     while (isLoadMoreButtonExist) {
//       await articlePage.clickOnLoadMoreButton();
//       isLoadMoreButtonExist = await cdPage.locator(`${articlePage.loadMoreButton}`).isVisible();
//     }
//     await expect(await cdPage.locator(articlePage.loadMoreButton)).toBeHidden();
//   })

//   test('Add and Delete Like reaction for the first comment', async () => {

//     await articlePage.clickOnLikeReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.likeReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnLikeReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();

//   })

//   test('Replace Like reaction with Care reaction for the first comment', async () => {

//     await articlePage.clickOnLikeReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.likeReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnCareReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.careReactionInReactionsSummaryForComments)).toBeVisible();

//   })

//   test('Add and Delete Love reaction for the first comment', async () => {

//     await articlePage.clickOnLoveReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.loveReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnLoveReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })

//   test('Add and Delete Care reaction for the first comment', async () => {

//     await articlePage.clickOnCareReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.careReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnCareReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })

//   test('Add and Delete Laugh reaction for the first comment', async () => {

//     await articlePage.clickOnLaughReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.laughReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnLaughReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })

//   test('Add and Delete Sad reaction for the first comment', async () => {

//     await articlePage.clickOnSadReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.sadReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnSadReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })

//   test('Add and Delete Surprised reaction for the first comment', async () => {

//     await articlePage.clickOnSurprisedReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.surprisedReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnSurprisedReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })

//   test('Add and Delete Angry reaction for the first comment', async () => {

//     await articlePage.clickOnAngryReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.angryReactionInReactionsSummaryForComments)).toBeVisible();

//     await articlePage.clickOnAngryReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.reactionsSummary)).toBeHidden();
//   })


//   test('Validate reacations with diffrent users', async () => {

//     test.setTimeout(120000);
//     await articlePage.clickOnLoveReactionForTheFirstComment();
//     await expect(await cdPage.locator(articlePage.loveReactionInReactionsSummaryForComments)).toBeVisible();



//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(alexUsername, password);
//     await cdLoginPage.LoginWithAzure(alexUsername, password);
//     await articlePage.goTo();
//     await articlePage.clickOnLikeReactionForTheFirstComment();
//     await expect(await cdPage2.locator(articlePage.likeReactionInReactionsSummaryForComments)).toBeVisible();

//     cdContext3 = await browser.newContext({ viewport: null });
//     cdPage3 = await cdContext3.newPage();
//     cdLoginPage = new CDLoginPage(cdPage3);
//     articlePage = new CDPageWithCommentsComponent(cdPage3);
//     await cdPage3.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(allenUsername, password);
//     await cdLoginPage.LoginWithAzure(allenUsername, password);
//     await articlePage.goTo();
//     await articlePage.waitFor(2000);
//     await articlePage.clickOnLaughReactionForTheFirstComment();
//     await expect(await cdPage3.locator(articlePage.loveReactionInReactionsSummaryForComments)).toBeVisible();

//   })


//   test('Validate Combined reacations with diffrent users', async () => {

//     test.setTimeout(300000);
//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(skyebUser, password);
//     await cdLoginPage.LoginWithAzure(skyebUser, password);
//     await articlePage.goTo();
//     await articlePage.clickOnLikeReactionForTheFirstComment();
//     await expect(await cdPage2.locator(articlePage.likeReactionInReactionsSummaryForComments)).toBeVisible();

//     cdContext3 = await browser.newContext({ viewport: null });
//     cdPage3 = await cdContext3.newPage();
//     cdLoginPage = new CDLoginPage(cdPage3);
//     articlePage = new CDPageWithCommentsComponent(cdPage3);
//     await cdPage3.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(johnqUser, password);
//     await cdLoginPage.LoginWithAzure(johnqUser, password);
//     await articlePage.goTo();
//     await articlePage.waitFor(2000);
//     await articlePage.clickOnAngryReactionForTheFirstComment();
//     //await expect(cdPage3.locator('//div[@class="reactions-summary"]//img[@title="Angry"]')).toBeVisible();

//     let firstRecation = await cdPage3.locator(articlePage.firstCompactedIcon);
//     let secondReaction = await cdPage3.locator(articlePage.secondCompactedIcon);

//     let firstSrcValue = await cdPage3.getAttribute(articlePage.firstCompactedIcon, 'src');
//     let secondSrcValue = await cdPage3.getAttribute(articlePage.secondCompactedIcon, 'src');
//     await expect(firstRecation).toHaveAttribute('src', firstSrcValue);
//     await expect(secondReaction).toHaveAttribute('src', secondSrcValue);
//     await articlePage.clickOnTotalNumberOfReactions();

//     let areaToCompare = await cdPage3.locator(articlePage.combactedReactionsDiv);
//     //Apply visual testing
//     expect(await areaToCompare.screenshot()).toMatchSnapshot(`CD_combacted_Reactions_Div.png`);



//   })


//   test('Add Long Comment', async () => {

//     let text = 'Long comment Long comment Long comment Long comment Long comment Long comment Long comment Long comment Long comment done';
//     let count = 0;
//     let isDisplayed = await cdPage.locator(articlePage.noCommentsElement).isVisible();
//     if (!isDisplayed) {
//       count = await cdPage.locator(articlePage.commentsCount).innerText();
//     }
//     await articlePage.addComment(text);
//     let newCount = parseInt(count) + 1;
//     await expect(await cdPage.locator(articlePage.commentsCount)).toContainText(newCount.toString());
//   })

//   test('Validate [Comment Or Reply Is Not Updated message] refresh message with diffrent users', async () => {

//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(alexUsername, password);
//     await cdLoginPage.LoginWithAzure(alexUsername, password);
//     await articlePage.goTo();
//     await articlePage.clickOnLoveReactionForTheFirstComment();

//     articlePage = new CDPageWithCommentsComponent(cdPage);
//     text = 'out dated comment';
//     await articlePage.addComment(text);
//     await articlePage.waitFor(2000);
//     await expect(await cdPage.locator(articlePage.outDatedMessage)).toBeVisible();

//   })

//   test('Delete all comments', async () => {
//     test.setTimeout(30000);
//     //let loadMoreButton = await cdPage.locator(articlePage.loadMoreButton);
//     let countOfComments = await cdPage.locator(articlePage.commentsCount).innerText();
//     let isLoadMoreButtonExist = await cdPage.$$(`${articlePage.loadMoreButton}`);
//     while (isLoadMoreButtonExist.length > 0) {
//       await articlePage.clickOnLoadMoreButton();
//       isLoadMoreButtonExist = await cdPage.$$(`${articlePage.loadMoreButton}`);
//     }

//     let count = parseInt(countOfComments);

//     for (let i = 0; i < count; i++) {
//       await articlePage.deleteFirstComment();
//       await articlePage.waitFor(1000);
//     }

//   })

//   test('Like content item by diffrent users', async () => {

//     test.setTimeout(300000);
//     let summary = await cdPage.locator(articlePage.contentItemReactionsSummary);
//     await expect(summary).toContainText('0 reaction(s)');

//     await articlePage.clickOnLikeContentItem();

//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(alexUsername, password);
//     await cdLoginPage.LoginWithAzure(alexUsername, password);
//     await articlePage.goTo();
//     await articlePage.clickOnLikeContentItem();

//     cdContext3 = await browser.newContext({ viewport: null });
//     cdPage3 = await cdContext3.newPage();
//     cdLoginPage = new CDLoginPage(cdPage3);
//     articlePage = new CDPageWithCommentsComponent(cdPage3);
//     await cdPage3.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(allenUsername, password);
//     await cdLoginPage.LoginWithAzure(allenUsername, password);
//     await articlePage.goTo();
//     await articlePage.waitFor(2000);
//     await articlePage.clickOnLikeContentItem();
//     await expect(await cdPage3.locator(articlePage.contentItemTotalNumberOfLikes)).toContainText('3');
//     let likeImg = await cdPage3.locator(articlePage.contentItemLikeReactionInReactionsSummary);
//     let title = await likeImg.getAttribute('title');
//     await expect(title).toContain('Like');
//     await expect(await cdPage3.locator(articlePage.totalNumberOfLikes)).toContainText('3');

//   })

//   test('Validate the Total number Of reactions in the interaction summary component', async () => {

//     let totalNumberInTheSummary = await cdPage.locator(articlePage.interactionSummaryTotalNumberOfReactions);
//     let count = await cdPage.locator(articlePage.totalNumberOfLikes).innerText();
//     await expect(totalNumberInTheSummary).toContainText(count);
//   })

//   test('Unlike content item by diffrent users', async () => {

//     test.setTimeout(300000);

//     await articlePage.clickOnLikeContentItem();

//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(alexUsername, password);
//     await cdLoginPage.LoginWithAzure(alexUsername, password);
//     await articlePage.goTo();
//     await articlePage.clickOnLikeContentItem();

//     cdContext3 = await browser.newContext({ viewport: null });
//     cdPage3 = await cdContext3.newPage();
//     cdLoginPage = new CDLoginPage(cdPage3);
//     articlePage = new CDPageWithCommentsComponent(cdPage3);
//     await cdPage3.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(allenUsername, password);
//     await cdLoginPage.LoginWithAzure(allenUsername, password);
//     await articlePage.goTo();
//     await articlePage.waitFor(2000);
//     await articlePage.clickOnLikeContentItem();

//     let summary = await cdPage3.locator(articlePage.contentItemReactionsSummary);
//     await expect(summary).toContainText('0 reaction(s)');

//   })


//   test('Rating content item by diffrent users', async () => {

//     test.setTimeout(120000);

//     await articlePage.rateBy('3');

//     cdContext2 = await browser.newContext({ viewport: null });
//     cdPage2 = await cdContext2.newPage();
//     let cdLoginPage = new CDLoginPage(cdPage2);
//     articlePage = new CDPageWithCommentsComponent(cdPage2);
//     await cdPage2.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(alexUsername, password);
//     await cdLoginPage.LoginWithAzure(alexUsername, password);
//     await articlePage.goTo();
//     await articlePage.rateBy('1');

//     cdContext3 = await browser.newContext({ viewport: null });
//     cdPage3 = await cdContext3.newPage();
//     cdLoginPage = new CDLoginPage(cdPage3);
//     articlePage = new CDPageWithCommentsComponent(cdPage3);
//     await cdPage3.goto(`${Environment.CDURL}`);
//     //await cdLoginPage.LoginWithOpenId(allenUsername, password);
//     await cdLoginPage.LoginWithAzure(allenUsername, password);
//     await articlePage.goTo();
//     await articlePage.waitFor(2000);
//     await articlePage.rateBy('2');

//     let ratingAvg = await cdPage3.locator(articlePage.contentItemRatingAvg);
//     await expect(ratingAvg).toContainText('2');
//   })

//   test('Validate the Total number Of Rating in the interaction summary component', async () => {

//     let totalNumberInTheSummary = await cdPage.locator(articlePage.interactionSummaryRatingAvg);
//     let count = await cdPage.locator(articlePage.contentItemRatingAvg).innerText();
//     await expect(totalNumberInTheSummary).toContainText(count);
//   })

//   test('Validate the interaction summary Title', async () => {
//     let title = await cdPage.locator(articlePage.interactionsSummaryTitle);
//     await expect(title).toContainText('summary');
//   })

//   test('Validate the interaction summary [Reviews] label', async () => {
//     let summary = await cdPage.locator(articlePage.interactionSummary);
//     await expect(summary).toHaveAttribute('data-totallabel', 'reviews');
//   })

//   test('Validate the interaction summary [Reactions] label', async () => {
//     let summary = await cdPage.locator(articlePage.interactionSummary);
//     await expect(summary).toHaveAttribute('data-reactionscountlabel', 'reaction(s)');
//   })

//   test('Validate the interaction summary [Comments] label', async () => {
//     let summary = await cdPage.locator(articlePage.interactionSummary);
//     await expect(summary).toHaveAttribute('data-commentscountlabel', 'comment(s)');
//   })

//   test('Validate the rating title', async () => {
//     let title = await cdPage.locator(articlePage.ratingTitle);
//     await expect(title).toContainText('rating title');
//   })

//   test('Validate rating score label', async () => {
//     let score = await cdPage.locator(articlePage.ratingScoreLabel);
//     await expect(score).toContainText('avg');
//   })

//   test('Validate rating count label', async () => {
//     let score = await cdPage.locator(articlePage.ratingCountLabel);
//     await expect(score).toContainText('reviews');
//   })

//   test('Validate reactions title', async () => {
//     let title = await cdPage.locator(articlePage.reactionsTitle);
//     await expect(title).toContainText('reactions title');
//   })

//   test('Validate reactions count label', async () => {
//     let reactions = await cdPage.locator(articlePage.reactions);
//     await expect(reactions).toHaveAttribute('data-reactionscountlabel', 'reaction(s)');
//   })

//   test('Validate comments title', async () => {
//     let title = await cdPage.locator(articlePage.commentsTitle);
//     await expect(title).toContainText('comments title');
//   })

//   test('Validate the reactions component from another page', async () => {


//     await articlePage.goToPage1();
//     await cdPage.waitForSelector(articlePage.careReactionInReactionsSummary, { waitFor: "visible", timeout: 12000 });
//     let reactionsLocator = await cdPage.locator(articlePage.reactions);

//     expect(await reactionsLocator.screenshot()).toMatchSnapshot(`reactionsInFirstPage.png`);

//     await articlePage.goToPage2();
//     await cdPage.waitForSelector(articlePage.careReactionInReactionsSummary, { waitFor: "visible", timeout: 8000 });
//     reactionsLocator = await cdPage.locator(articlePage.reactions);
//     expect(await reactionsLocator.screenshot()).toMatchSnapshot(`reactionsInSecondPage.png`);

//   })

//   test('Validate rating compoent from another page', async () => {

//     await test.setTimeout(60000);
//     await articlePage.goToPage1();
//     await articlePage.waitFor(1000);
//     await cdPage.waitForSelector(articlePage.rating, { waitFor: "visible", timeout: 8000 });
//     let ratingLocator = await cdPage.locator(articlePage.rating);
//     await ratingLocator.screenshot({ path: './Tests/Comments/CommentsComponentCD.spec.js-snapshots/ratingInFirstPage-win32.png' });

//     await articlePage.goToPage2();
//     await articlePage.waitFor(1000);
//     await cdPage.waitForSelector(articlePage.rating, { waitFor: "visible", timeout: 8000 });
//     ratingLocator = await cdPage.locator(articlePage.rating);
//     expect(await ratingLocator.screenshot()).toMatchSnapshot(`ratingInFirstPage.png`);

//   })

//   test('Validate interaction summary component between two pages', async () => {

//     await test.setTimeout(60000);
//     await articlePage.goToPage1();
//     await articlePage.waitFor(1000);
//     await cdPage.waitForSelector(articlePage.interactionSummary, { waitFor: "visible", timeout: 8000 });
//     //let summaryLocator = await cdPage.locator(articlePage.interactionSummary);
//     let totalNumberOfCommentsInPage1 = await articlePage.getTotalNumberOfCommentsFromSummary();
//     let totalNumberOfRactionsInPage1 = await articlePage.getTotalNumberOfReactionsFromSummary();
//     let totalNumberOfRatingInPage1 = await articlePage.getTotalNumberOfRatingFromSummary();

//     //await summaryLocator.screenshot({ path: `./Tests/Comments/CommentsComponentCD.spec.js-snapshots/summaryInFirstPage-win32.png` });

//     await articlePage.goToPage2();
//     await articlePage.waitFor(1000);
//     let totalNumberOfCommentsInPage2 = await articlePage.getTotalNumberOfCommentsFromSummary();
//     let totalNumberOfRactionsInPage2 = await articlePage.getTotalNumberOfReactionsFromSummary();
//     let totalNumberOfRatingInPage2 = await articlePage.getTotalNumberOfRatingFromSummary();
//     //summaryLocator = await cdPage.locator(articlePage.interactionSummary);
//     await expect(totalNumberOfCommentsInPage1).toContain(totalNumberOfCommentsInPage2);
//     await expect(totalNumberOfRactionsInPage1).toContain(totalNumberOfRactionsInPage2);
//     await expect(totalNumberOfRatingInPage1).toContain(totalNumberOfRatingInPage2);
//     //expect(await summaryLocator.screenshot()).toMatchSnapshot('summaryInFirstPage.png');

//   })

//   test('Validate comments component from another page', async () => {

//     await articlePage.goToPage1();
//     await articlePage.waitFor(1000);
//     let commentsLocator = await cdPage.locator(articlePage.commentsHeader);
//     await commentsLocator.screenshot({ path: `./Tests/Comments/CommentsComponentCD.spec.js-snapshots/commentsHeaderInFirstPage-win32.png` });

//     await articlePage.goToPage2();
//     await articlePage.waitFor(1000);
//     commentsLocator = await cdPage.locator(articlePage.commentsHeader);
//     expect(await commentsLocator.screenshot()).toMatchSnapshot('commentsHeaderInFirstPage.png');

//   })

//   test('Validate Replies and Reactions when they are disabled', async () => {

//     await articlePage.goToDisabledPage();
//     await articlePage.clickOnTheThreeDotsForTheFirstComment();
//     let menu = await cdPage.locator(articlePage.commentsOptionsMenu);
//     expect(await menu.screenshot()).toMatchSnapshot('comments-menu.png');


//   })


//   test('Validate disabled comments', async () => {
//     await articlePage.goToPage1();
//     let textArea = await cdPage.locator('//textarea');
//     await expect(textArea).toBeHidden();
//   })

//   test('Validate disabled content item reactions', async () => {

//     await articlePage.goToDisabledPage();
//     let header = await cdPage.locator(articlePage.interactionsHeader);
//     expect(await header.screenshot()).toMatchSnapshot('interactionsHeader.png');
//   })


//   test('Validate disabled rating', async () => {

//     await articlePage.goToDisabledPage();
//     await cdPage.locator('(//span[@class="fa fa-star"])[1]').click();
//     let header = cdPage.locator(articlePage.interactionsHeader);
//     expect(await header.screenshot()).toMatchSnapshot('interactionsHeader.png');

//   })

//   test('Validate content item reactions list', async () => {
//     await cdPage.locator(articlePage.contentItemReactingButton).click();
//     let contentItemReactionsList = cdPage.locator(articlePage.contentItemReactionsList);
//     expect(await contentItemReactionsList.screenshot()).toMatchSnapshot('contentItemReactionsList.png');

//   })



//   test.afterEach(async () => {
//     await browser.close();
//   })
// })
