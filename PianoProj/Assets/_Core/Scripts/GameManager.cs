using System;
using System.Collections;
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
    private Vector3 _playCamPos;

    public bool IsPlayCamera
    {
        get => _isPlayCamera;
        set
        {
            _isPlayCamera = value;

            if (_isPlayCamera)
            {
                Hint.Inst.ShowHint("�������� ���� �� ����� ���� ���������� �����.\n�������� ����� �� ������ ��� �� ������.\n��������� ����� ��� ����������� (�� ������) �� �������� ��� ����", 10f);
            }
            else
            {
                Hint.Inst.ShowHint("��������� ����� �������. ��� ���� �� ������� ������� �� P.", 3f);
            }

            _fpsControll.SetActive(!value);
            _playCamera.gameObject.SetActive(value);
            _playCamera.transform.position = _playCamPos;
            Cursor.lockState = value ? CursorLockMode.None : CursorLockMode.Locked;
            Cursor.visible = value;
        }
    }

    private void Awake()
    {
        Inst = this;

        _playCamPos = _playCamera.transform.position;
    }

    private void Start()
    {
        IsPlayCamera = false;
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.P))
        {
            IsPlayCamera = !IsPlayCamera;
        }

    }
}
