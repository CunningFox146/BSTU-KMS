using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    private static GameManager _inst;

    public static GameManager Inst
    {
        get => _inst;
        private set
        {
            if (_inst != null)
            {
                Destroy(value.gameObject);
                return;
            }
            _inst = value;
        }
    }

    [SerializeField] private GameObject _fpsControll;
    [SerializeField] private Camera _playCamera;

    private bool _isPlayCamera;

    public bool IsPlayCamera
    {
        get => _isPlayCamera;
        set
        {
            _isPlayCamera = value;

            _fpsControll.SetActive(!value);
            _playCamera.gameObject.SetActive(value);
        }
    }

    private void Awake()
    {
        Inst = this;
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.E))
        {
            IsPlayCamera = !IsPlayCamera;
        }
    }
}
