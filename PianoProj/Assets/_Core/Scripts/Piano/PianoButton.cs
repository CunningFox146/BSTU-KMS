using System.Collections;
using UnityEngine;

public class PianoButton : MonoBehaviour, IInteractavble
{
    public TextMesh text;
    [HideInInspector] public float pitch;

    private AudioSource _source;
    private Piano _piano;
    private Vector3 _startRot;

    private Coroutine _clickCoroutine;
    private Coroutine _soundCoroutine;


    private void Awake()
    {
        _source = GetComponent<AudioSource>();
        _piano = transform.root.GetComponent<Piano>();

        _piano.OnLeftLegChanged += OnLeftLegChangedHandler;

        text.gameObject.SetActive(false);

        _startRot = transform.eulerAngles;

        var octave = transform.parent.GetComponent<Octave>();
        octave.buttons.Add(gameObject.name, this);
        _source.clip = LoadClip(octave.octave);
    }


    private void OnLeftLegChangedHandler(bool isActive)
    {
        if (isActive && _soundCoroutine != null)
        {
            StopCoroutine(_soundCoroutine);
        }
    }

    private AudioClip LoadClip(int octave) => Resources.Load<AudioClip>($"Notes/{octave}-{gameObject.name.ToLower()}");

    public void OnClick()
    {
        if (_clickCoroutine != null)
        {
            StopCoroutine(_clickCoroutine);
        }

        _clickCoroutine = StartCoroutine(ClickCoroutine(0.15f));

        PlaySound();
    }

    private void PlaySound()
    {
        _source.volume = 1f;
        _source.Play();

        if (!_piano.IsLeftLeg)
        {
            if (_soundCoroutine != null)
            {
                StopCoroutine(_soundCoroutine);
            }
            _soundCoroutine = StartCoroutine(SoundCoroutine(0.35f, 0.15f));
        }
    }

    private IEnumerator SoundCoroutine(float delay, float duration)
    {
        yield return new WaitForSeconds(delay);

        float start = Time.time;
        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - start) / duration);
            _source.volume = 1f - percent;
            if (Mathf.Approximately(percent, 1f)) break;
            yield return null;
        }
    }

    private IEnumerator ClickCoroutine(float duration)
    {
        var startRot = transform.eulerAngles;
        var targetRot = new Vector3(10f, _startRot.y, _startRot.z);
        float startTime = Time.time;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / duration);
            transform.eulerAngles = Vector3.Lerp(startRot, targetRot, percent);

            if (Mathf.Approximately(percent, 1f))
            {
                _clickCoroutine = StartCoroutine(ClickBackCoroutine(duration));
                break;
            }
            yield return null;
        }
    }
    private IEnumerator ClickBackCoroutine(float duration)
    {
        var startRot = transform.eulerAngles;
        float startTime = Time.time;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / duration);
            transform.eulerAngles = Vector3.Lerp(startRot, _startRot, percent);

            if (Mathf.Approximately(percent, 1f)) break;
            yield return null;
        }
    }
}
