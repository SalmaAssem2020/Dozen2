const { test } = require('@playwright/test');
const Environment = require('../Data/Environment');


class CDPageWithCommentsComponent {

    constructor(page) {
        this.page = page;
        this.noCommentsElement = '//div[@class="dozen-comments"]//*[text()="There are no comments to show"]';
        this.commentInput = '//div[@class="dozen-comments"]//textarea';
        //this.addCommentButton = 'text=comment 1AV >> svg';
        this.commentsCount = '.comments-count';
        this.threeDotsForTheFirstComment = '.actions-dropdown-button';
        this.firstReply = '(//div[@class="reply-item"]//span)[1]';
        this.threeDotsForTheFirstReplay = '//div[@class="reply-item"]//button[@class="actions-dropdown-button"]';
        this.deleteButton = '//button[text()="Delete"]';
        this.editButton = '//button[text()="Edit"]';
        this.yesButtonInDeleteButton = 'text=Yes';
        this.replyButtonForTheFirstComment = 'button:has-text("Reply")';
        this.replyTextArea = '//div[@class="comment-item-wrapper"]//textarea';
        this.saveButton = '//div[text()="Save"]';
        this.firstReactionButton = '(//div[contains(@class,"container-fluid comments-wrapper ")]//button)[1]';
        this.loveButton = '//img[@title="Love"]//parent::button';
        this.likeButton = '//img[@title="Like"]//parent::button';
        this.laughButton = '//img[@title="Laugh"]//parent::button';
        this.sadButton = '//img[@title="Sad"]//parent::button';
        this.surprisedButton = '//img[@title="Surprised"]//parent::button';
        this.angryButton = '//img[@title="Angry"]//parent::button';
        this.careButton = '//img[@title="Care"]//parent::button';
        this.firstComment = '(//*[@class="comment-data"]//span)[1]';
        this.loadMoreButton = '//button[contains(@class,"load-more")]';
        this.ReactionButtonForTheFirstReply = '//div[@class="reply-item"]//*[@class="reaction popover-reaction"]';
        this.totalNumberOfLoveReactionsForTheFirstReply = '//div[@class="reply-item"]//div[@class="reactions-summary"]//span';
        this.totalNumberOfReactionsForTheFirstComment = '//div[@class="comment-item-wrapper"]//div[@class="reactions-summary"]//span';
        this.outDatedMessage = '//div[contains(text(),"Comments is out dated, ")]';
        this.loadMoreReplies = '//*[@class="reply-wrapper "]//button[@class="load-more"]';
        this.totalNumberOfReactionsInCombinedCase = '//*[@class="reactions-summary"]//button';
        this.combactedReactionsDiv = '//*[@class="reactions-summary"]//div[contains(@class,"flex-wrapper -mt-12 p-2 bg-white")]';
        this.contentItemReactingButton = '//button[@class="all-reactions-trigger reaction popover-reaction"]';
        this.contentItemReactionsSummary = '//div[@class="summary-reactions"]';
        this.contentItemTotalNumberOfLikes = '//div[@class="summary-reactions"]//span';
        this.contentItemLikeReactionInReactionsSummary = '//div[@class="summary-reactions"]//img';
        this.contentItemLikeButton = '//img[@data-id="{2B0625A1-2F1D-46CC-98C2-3C1C916067E2}"]';
        this.contentItemRatingAvg = '//span[@class="rating-avg"]//span';
        this.interactionsSummaryTitle = 'text=summary';
        this.interactionSummaryTotalNumberOfComments = '//div[@dozen-interaction-type="Comments"]//span[@class="summary-section-text"]';
        this.interactionSummaryTotalNumberOfReactions = '//div[@dozen-interaction-type="Reactions"]//button';
        this.interactionSummaryRatingAvg = '//div[@dozen-interaction-type="Ratings"]//span[@class="summary-section-text"]';
        this.interactionSummaryTotalNumberOfRaters = '//div[@dozen-interaction-type="Ratings"]//span[@class="summary-section-total-raters"]';
        this.totalNumberOfLikes = '//div[@class="summary-reactions"]//span';
        this.summaryCommentsLabel = '//div[@dozen-interaction-type="Comments"]//span[@class="summary-section-text"]';
        this.interactionSummary = '//div[@class="dozen-interaction-summary"]';
        this.ratingTitle = '//div[@class="component-content"]//h3[text()="rating title"]';
        this.ratingScoreLabel = '//span[@class="rating-label"][1]';
        this.ratingCountLabel = '//span[@class="rating-label"][2]';
        this.reactionsTitle = '//*[text()="reactions title"]';
        this.reactions = '(//*[@class="dozen-reactions"])[1]';
        this.commentsTitle = '//*[contains(@class,"container-fluid comments-wrapper ")]//h3';
        this.ratingCount = '//*[@class="dozen-ratings interactive "]//span[@class="rating-count"]';
        this.rating = '//div[@class="dozen-ratings interactive "]';
        this.commentsHeader = '//*[contains(@class,"comments-wrapper-title")]';
        this.comments = '//div[contains(@class,"component dozen-interactions-component dozen-component-content")]';
        this.commentsOptionsMenu = '//button[text()="Delete"]/parent::div';
        this.firstThreeDotsBtn = '(//button[@class="actions-dropdown-button"])[1]';
        this.interactionsHeader = '//h3[text()="Rating component"]/parent::div/parent::div';
        this.contentItemReactionsList = '(//div[@class="dozen-reactions-flyout-items-wrapper "])[1]';
        this.careReactionInReactionsSummary = '//div[@class="summary-reactions-container"]//img[@title="Care"]';
        this.totalNumberOfCommentsInSummary = '//div[@dozen-interaction-type="Comments"]//span[@class="summary-section-text"]';
        this.totalNumberOfRatingInSummary = '//div[@dozen-interaction-type="Ratings"]//span[@class="summary-section-text"]';
        this.totalNumberOfReactionsInSummary = '//div[@dozen-interaction-type="Reactions"]//button';
        this.replyLoveReactionInReactionsSummary = '//div[@class="reply-item"]//div[@class="reactions-summary"]//img[@title="Love"]';
        this.replyReactionSummary = '//div[@class="reply-item"]//div[@class="reactions-summary"]';
        this.reactionsSummary  = '//div[@class="reactions-summary"]';
        this.firstCompactedIcon = '//*[@class="flex-wrapper items-center compacted"]//img[1]';
        this.secondCompactedIcon = '//*[@class="flex-wrapper items-center compacted"]//img[1]';
        this.likeReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"like")]';
        this.loveReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"love")]';
        this.careReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"care")]';
        this.laughReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"laugh")]';
        this.sadReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"sad")]';
        this.surprisedReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"wow")]';
        this.angryReactionInReactionsSummaryForComments = '//div[@class="reactions-summary"]//img[contains(@src,"angry")]';

    }

    async addComment(comment) {

        await this.page.click(this.commentInput);
        await this.page.fill(this.commentInput, comment);
        await this.page.locator(`text=${comment}AV >> svg`).click();
        await this.page.waitForTimeout(1000);
    }

    async addReply(reply) {
        await this.page.click(this.replyButtonForTheFirstComment);
        await this.page.click(this.replyTextArea);
        await this.page.fill(this.replyTextArea, reply);
        let replyButton = `text=${reply}AV >> svg`;
        await this.page.locator(replyButton).first().click();
        await this.page.waitForTimeout(1000);
        //await this.page.click(replyButtonLocator);
    }


    async editFirstReply(newComment) {

        await this.page.waitForSelector(this.threeDotsForTheFirstReplay, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.threeDotsForTheFirstReplay);
        await this.page.waitForSelector(this.editButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.editButton);
        await this.page.waitForSelector(this.replyTextArea, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.replyTextArea);
        await this.page.fill(this.replyTextArea, newComment);
        await this.page.click(this.saveButton);
        await this.page.waitForTimeout(2000);

    }

    async clickOnTheThreeDotsForTheFirstComment() {
        await this.page.waitForSelector(this.firstThreeDotsBtn, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.firstThreeDotsBtn);
    }

    async deleteFirstReply() {

        await this.page.click(this.threeDotsForTheFirstReplay);
        await this.page.click(this.deleteButton);
        await this.page.click(this.yesButtonInDeleteButton);

    }


    async goTo() {
        //https://dz3qacd.dozen.ai/Article-page-for-comments
        await this.page.goto(`${Environment.CDURL}Auto/Comments-page`, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(1000);
    }

    async goToDisabledPage() {

        await this.page.goto(`${Environment.CDURL}Auto/Disabled%20Comments%20Component`, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(6000);
    }

    async goToPage1() {

        await this.page.goto(`${Environment.CDURL}Auto/Automation%20interactions%20component%20page%201`);
        await this.page.waitForTimeout(1000);
    }

    async goToPage2() {

        await this.page.goto(`${Environment.CDURL}Auto/Automation%20interactions%20component%20page%202`, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(1000);
    }

    async getCommentMessage() {
        let isDisplayed = await this.page.locator(this.noCommentsElement).isVisible();
        if (isDisplayed == true) {
            let message = await this.page.locator(this.noCommentsElement).innerText();
            return message;
        } else {
            return null;
        }
    }


    async editFirstComment(newComment) {

        await this.page.waitForSelector(this.threeDotsForTheFirstComment, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.threeDotsForTheFirstComment);
        await this.page.waitForSelector(this.editButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.editButton);
        await this.page.waitForSelector(this.replyTextArea, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.replyTextArea);
        await this.page.fill(this.replyTextArea, newComment);
        await this.page.click(this.saveButton);
        await this.page.waitForTimeout(2000);
    }

    async deleteFirstComment() {

        await this.page.waitForSelector(this.threeDotsForTheFirstComment, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.threeDotsForTheFirstComment);
        await this.page.waitForSelector(this.deleteButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.deleteButton);
        await this.page.waitForSelector(this.yesButtonInDeleteButton, { waitFor: "visible", timeout: 8000 });
        await this.page.click(this.yesButtonInDeleteButton);
    }


    async clickOnLikeReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.likeButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnLoveReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.loveButton);
        await this.page.waitForTimeout(1000);
    }


    async clickOnLaughReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.laughButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnSadReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.sadButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnSurprisedReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.surprisedButton);
        await this.page.waitForTimeout(1000);
    }


    async clickOnAngryReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.angryButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnCareReactionForTheFirstComment() {

        await this.page.click(this.firstReactionButton);
        await this.page.click(this.careButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnLoadMoreButton() {

        await this.page.click(this.loadMoreButton);
        await this.page.waitForTimeout(1000);
    }

    async clickOnTotalNumberOfReactions() {
        await this.page.click(this.totalNumberOfReactionsInCombinedCase);
        await this.page.waitForTimeout(1000);
    }

    async clickOnLoadMoreRepliesButton() {

        await this.page.click(this.loadMoreReplies);
        await this.page.waitForTimeout(1000);
    }

    async clickOnLoveReactionButtonForTheFirstReply() {

        await this.page.click(this.ReactionButtonForTheFirstReply);
        await this.page.click(this.loveButton);
    }

    async waitFor(time) {
        await this.page.waitForTimeout(time);
    }

    async rateBy(ratingNumber) {

        await this.page.click(`//div[@class="dozen-ratings interactive "]//div[@class="rating-wrapper"]//div[@class="rating--edit"]//span[${ratingNumber}]`, { force: true });
    }

    async clickOnLikeContentItem() {

        await this.page.click(this.contentItemReactingButton);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.contentItemLikeButton);
    }

    async getTotalNumberOfCommentsFromSummary() {
        let value = await this.page.locator(this.totalNumberOfCommentsInSummary).innerText();
        return value;
    }

    async getTotalNumberOfRatingFromSummary() {
        let value = await this.page.locator(this.totalNumberOfRatingInSummary).innerText();
        return value;
    }

    async getTotalNumberOfReactionsFromSummary() {
        let value = await this.page.locator(this.totalNumberOfReactionsInSummary).innerText();
        return value;
    }
}

module.exports = CDPageWithCommentsComponent;