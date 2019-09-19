#!/usr/bin/env bash


# get build status and branch
# send notification

STATUS=$1 #job status
IMAGE_TAG=$(echo $GIT_COMMIT | cut -c -7)
#Replace the '/' in the branch name for branches with it for example
# 'story/xxxx-191'
REBUILD_BRANCH=$(echo $GIT_BRANCH | sed 's/\//%2F/g')
REBUILD_URL="https://jenkins.andela.com/blue/organizations/jenkins/converge-companion-app/detail/${REBUILD_BRANCH}/${BUILD_NUMBER}/pipeline"
get_build_report() {
    # Report the status of builds
    if [ "$STAGE_NAME" == 'test' -a  "$STATUS" == 'success' ]; then
        # If the test stage succeeded
        MESSAGE_TEXT="Test Phase Passed! :smiley:"
        COLOR="good"

    elif [ "$STAGE_NAME" == 'test' -a  "$STATUS" == 'fail' ]; then
        #If the test stage failed
        MESSAGE_TEXT="Test Phase Failed :scream:"
        COLOR="danger"
        ACTION_BUTTON="$(echo \
              "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
          )"
    elif [ "$STAGE_NAME" == 'lint' -a "$STATUS" == 'success' ]; then
        # If the lint stage succeeded
        MESSAGE_TEXT="Lint Phase Succeeded :rocket:"
        COLOR="good"

    elif [ "$STAGE_NAME" == 'lint' -a  "$STATUS" == 'fail' ]; then
        # If the lint stage failed
        MESSAGE_TEXT="Lint Phase Failed  :scream:"
        ACTION_BUTTON="$(echo \
              "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
          )"
        COLOR="danger"
    elif [ "$STAGE_NAME" == 'iOS' -a  "$STATUS" == 'success' ]; then
        # If the iOS build succeeded
        MESSAGE_TEXT="Build for iOS Succeeded :rocket:"
        COLOR="good"

    elif [ "$STAGE_NAME" == 'iOS' -a "$STATUS" == 'fail' ]; then
        # If the iOS build phase failed
        MESSAGE_TEXT="Build for iOS Failed :scream:"
        COLOR="danger"
        ACTION_BUTTON="$(echo \
              "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
          )"

    elif [ "$STAGE_NAME" == 'android' -a  "$STATUS" == 'fail' ]; then
        #If the android build phase failed
        MESSAGE_TEXT="Build for Android Failed  :scream:"
        ACTION_BUTTON="$(echo \
              "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
          )"
        COLOR="danger"
    elif [ "$STAGE_NAME" == 'android' -a "$STATUS" == 'success' ]; then
        #If the android build stage succeeded
        MESSAGE_TEXT="Build for Android Succeeded :rocket:"
        COLOR="good"
    fi

    # prepare template for slack messaging
    COMMIT_LINK="https://github.com/andela/converge-companion-app/commit/${GIT_COMMIT}"
    # IMG_TAG="$(git rev-parse --short HEAD)"
    JENKINS_WORKFLOW_URL="${REBUILD_URL}"
    SLACK_TEXT_TITLE="Jenkins Build #$BUILD_NUMBER"
    SLACK_DEPLOYMENT_TEXT="Executed Git Commit <$COMMIT_LINK|${IMAGE_TAG}>: ${MESSAGE_TEXT}"

}

send_notification() {
    #Send the slack notification
    curl -X POST --data-urlencode \
    "payload={
        \"channel\": \"${BUILD_CHANNEL}\",
        \"username\": \"DeployNotification\",
        \"attachments\": [{
            \"fallback\": \"Jenkins build notification\",
            \"color\": \"${COLOR}\",
            \"author_name\": \"Branch: $GIT_BRANCH by ${GIT_COMMITTER_NAME}\",
            \"author_link\": \"https://github.com/andela/converge-companion-app/tree/${GIT_BRANCH}\",
            \"title\": \"${SLACK_TEXT_TITLE}\",
            \"title_link\": \"$JENKINS_WORKFLOW_URL\",
            \"text\": \"${SLACK_DEPLOYMENT_TEXT}\",
            \"actions\": [${ACTION_BUTTON}]
        }]
    }" \
    "${BUILD_CHANNEL_WEBHOOK}"
}

main() {
    get_build_report
    send_notification
}

main $@
