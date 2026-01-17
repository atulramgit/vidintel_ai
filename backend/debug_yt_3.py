from youtube_transcript_api import YouTubeTranscriptApi
import inspect

try:
    sig = inspect.signature(YouTubeTranscriptApi.fetch)
    print(f"Signature of fetch: {sig}")
    
    # Check if it's a bound method or function
    print(f"Is method: {inspect.ismethod(YouTubeTranscriptApi.fetch)}")
    print(f"Is function: {inspect.isfunction(YouTubeTranscriptApi.fetch)}")
    
    # Check if we can instantiate
    try:
        obj = YouTubeTranscriptApi()
        print("Successfully instantiated YouTubeTranscriptApi()")
    except Exception as e:
        print(f"Failed to instantiate: {e}")

except Exception as e:
    print(f"Error inspecting: {e}")
