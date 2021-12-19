using System.Collections;
using UnityEngine;

[RequireComponent(typeof(BoxCollider))]
public abstract class PianoLeg : MonoBehaviour, IInteractable
{
    protected Vector3 _startRot;

    protected Coroutine _clickCoroutine;

    protected virtual void Start()
    {
        _startRot = transform.localEulerAngles;
    }

    public abstract void OnClick();

    private void CancelClickCoroutine()
    {
        if (_clickCoroutine != null)
        {
            StopCoroutine(_clickCoroutine);
        }
    }

    protected Coroutine StartClickCoroutine(float duration, float angle = 290f) => _clickCoroutine = StartCoroutine(ClickCoroutine(duration, angle));
    protected void StartClickBackCoroutine(float duration) => transform.localEulerAngles = _startRot;

    protected IEnumerator ClickCoroutine(float duration, float angle)
    {
        CancelClickCoroutine();

        var startRot = transform.localEulerAngles;
        var targetRot = new Vector3(angle, _startRot.y, _startRot.z);
        float startTime = Time.time;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / duration);
            transform.localEulerAngles = Vector3.Lerp(startRot, targetRot, percent);

            if (Mathf.Approximately(percent, 1f)) break;
            yield return null;
        }
    }
}
