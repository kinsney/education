from rest_framework.response import Response

from misago.readtracker.threadstracker import make_posts_read_aware, read_thread


def post_read_endpoint(request, thread, post):
    make_posts_read_aware(request.user, thread, [post])
    if not post.is_read:
        read_thread(request.user, thread, post)
        if thread.subscription:
            thread.subscription.last_read_on = post.posted_on
    return Response({'detail': 'ok'})
