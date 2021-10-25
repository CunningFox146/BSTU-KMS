using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

public abstract class PianoLeg : MonoBehaviour, IClickable
{
    protected Vector3 _startRot;

    protected Coroutine _clickCoroutine;

    protected virtual void Start()
    {
        _startRot = transform.eulerAngles;
    }

    public abstract void OnClick();

    private void CancelClickCoroutine()
    {
        if (_clickCoroutine != null)
        {
            StopCoroutine(_clickCoroutine);
        }
    }

    protected Coroutine StartClickCoroutine(float duration, float angle = -10f) => _clickCoroutine = StartCoroutine(ClickCoroutine(duration, angle));
    protected void StartClickBackCoroutine(float duration) => transform.eulerAngles = _startRot;

    protected IEnumerator ClickCoroutine(float duration, float angle)
    {
        CancelClickCoroutine();

        var startRot = transform.eulerAngles;
        var targetRot = new Vector3(angle, _startRot.y, _startRot.z);
        float startTime = Time.time;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / duration);
            transform.eulerAngles = Vector3.Lerp(startRot, targetRot, percent);

            if (Mathf.Approximately(percent, 1f)) break;
            yield return null;
        }
    }

    //protected IEnumerator ClickBackCoroutine(float duration)
    //{
    //    CancelClickCoroutine();

    //    var startRot = transform.eulerAngles.x;
    //    float startTime = Time.time;

    //    while (true)
    //    {
    //        float percent = Mathf.Clamp01((Time.time - startTime) / duration);
    //        Debug.Log(percent);
    //        transform.eulerAngles = new Vector3(Mathf.Lerp(startRot, _startRot.x, percent), _startRot.y, _startRot.z);

    //        if (Mathf.Approximately(percent, 1f)) break;
    //        yield return null;
    //    }
    //}
}
