from youtube_transcript_api import YouTubeTranscriptApi
import sys

print(f"Python: {sys.version}")
attrs = dir(YouTubeTranscriptApi)
print(f"Attributes: {attrs}")

if 'fetch' in attrs:
    print("Found 'fetch' method.")
else:
    print("'fetch' NOT found.")

if 'get_transcript' in attrs:
    print("Found 'get_transcript' method.")
else:
    print("'get_transcript' NOT found.")
