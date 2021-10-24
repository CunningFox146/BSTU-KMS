using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PianoButton : MonoBehaviour, IClickable
{
    [HideInInspector] public float pitch;

    private AudioSource _source;
    private Coroutine _clickCoroutine;
    private Vector3 _startRot;

    private void Awake()
    {
        _source = GetComponent<AudioSource>();
    }

    private void Start()
    {
        _startRot = transform.eulerAngles;

        _source.clip = LoadClip(transform.parent.GetComponent<Octave>().octave);
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
        _source.Play();
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
