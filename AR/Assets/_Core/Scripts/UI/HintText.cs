using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

[RequireComponent(typeof(TMP_Text))]
public class HintText : MonoBehaviour
{
    private TMP_Text _text;
    private bool _isPlaced = false;

    private void Awake()
    {
        _text = GetComponent<TMP_Text>();

        ARManager.PoseValidChange += OnPoseValidChangeHandler;
        ARManager.ObjectChanged += OnObjectChangedHandler;

        OnPoseValidChangeHandler(false);
    }

    private void OnObjectChangedHandler(bool isAdded)
    {
        _isPlaced = isAdded;
        OnPoseValidChangeHandler(ARManager.IsPoseValid);

        if (isAdded)
        {
            _text.text = "Нажимайте на пианино для игры";
        }
    }

    private void OnPoseValidChangeHandler(bool isValid)
    {
        if (_isPlaced) return;

        _text.text = isValid ? "Установите пианино нажатием кнопки" : "Осмотрите комнату";
    }
}
