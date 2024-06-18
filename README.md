# Unified Backend

1. It supports a suite of products that I have prototyped over the last 3 months in Farcaster ecosystem.
2. Using FC Auth, you can experience multiple products through this single repo.

## Reason:

I am fed up of deploying multiple Vercel apps and their timeouts.
I need to run Kafka queues which require a backend server listening to the queue.

## User Stories:

### Glotsphere

1. As a user, I can translate and post a cast in the languages specified.

- Path - POST: glotsphere/create | body: {"castText": "", "languages": [""], "fid": "fid"} - CastCastDto
-
