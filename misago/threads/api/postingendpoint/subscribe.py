from misago.users.models import (
    AUTO_SUBSCRIBE_NONE, AUTO_SUBSCRIBE_NOTIFY, AUTO_SUBSCRIBE_NOTIFY_AND_EMAIL)

from ...models import Subscription
from . import PostingEndpoint, PostingMiddleware


class SubscribeMiddleware(PostingMiddleware):
    def use_this_middleware(self):
        return self.mode != PostingEndpoint.EDIT

    def post_save(self, serializer):
        self.subscribe_new_thread()
        self.subscribe_replied_thread()

    def subscribe_new_thread(self):
        if self.mode != PostingEndpoint.START:
            return

        if self.user.subscribe_to_started_threads == AUTO_SUBSCRIBE_NONE:
            return

        self.user.subscription_set.create(
            category=self.thread.category,
            thread=self.thread,
            send_email=self.user.subscribe_to_started_threads == AUTO_SUBSCRIBE_NOTIFY_AND_EMAIL
        )

    def subscribe_replied_thread(self):
        if self.mode != PostingEndpoint.REPLY:
            return

        if self.user.subscribe_to_replied_threads == AUTO_SUBSCRIBE_NONE:
            return

        try:
            subscription = self.user.subscription_set.get(thread=self.thread)
            return
        except Subscription.DoesNotExist:
            pass

        # we are replying to thread again?
        if self.user.post_set.filter(thread=self.thread).count() > 1:
            return

        self.user.subscription_set.create(
            category=self.thread.category,
            thread=self.thread,
            send_email=self.user.subscribe_to_replied_threads == AUTO_SUBSCRIBE_NOTIFY_AND_EMAIL
        )
